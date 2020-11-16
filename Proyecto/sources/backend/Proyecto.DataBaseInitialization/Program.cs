using ITI.Core.Persistence.EntityFrameworkCore;
using ITI.Core.Runtime;
using Proyecto.Application.Authentication;
using Proyecto.Application.Identity;
using Proyecto.Persistence.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using ITI.Core;
using System.Threading;

namespace Proyecto.DataBaseInitialization
{
    class Program
    {
        private static string mode = "prod";
        private static string connectionString = null;

        static void Main(string[] args)
        {
            var app = new CommandLineApplication
            {
                Name = "Proyecto.Tools.DataBaseInitialization",
                Description = "Herramienta para inicializar y/o actualizar la base de datos de un proyecto nuevo con la plantilla del ITI.Core"
            };


            var modeOption = app.Option("-m|--mode",
              "Test/Produccion -> Por defecto Produccion",
              CommandOptionType.SingleValue);

            var connectionStringOption = app.Option("-cs|--connectionString",
            "Cadena de conexion de la base de datos",
            CommandOptionType.SingleValue);

            app.HelpOption("-? | -h | --help");

            app.OnExecute(() =>
            {

                Console.WriteLine("Ejecutando Proyecto.Tools.DataBaseInitialization ...");


                if (!connectionStringOption.HasValue())
                {
                    Console.WriteLine("Es obligatorio especificar la cadena de conexión de la base de datos. Use el parametro -connectionString");

                    app.ShowHelp();

                    app.ShowHint();

                    return -1;
                }

                connectionString = connectionStringOption.Value();


                if (modeOption.HasValue())
                {
                    mode = modeOption.Value().ToLower();
                }

                IServiceCollection services = new ServiceCollection();

                services.AddTransient<IPrincipalAccessor, NullPrincipalAccessor>();
                services.AddTransient<IUserSession, UserSession>();

                services.AddDbContext<DbContextProyecto>(options =>
                                  options.UseSqlServer(connectionString));

                BootStrapper bootStrapper = new BootStrapper(services)
                              .UseEntityFrameworkCore<DbContextProyecto>();


                bootStrapper.Compose();

                var serviceProvider = services.BuildServiceProvider();

                try
                {
                    var context = serviceProvider.GetRequiredService<DbContextProyecto>();

                    switch (mode)
                    {
                        case "test":
                            Console.WriteLine("Inicializando en modo Test:");

                            Console.WriteLine("Eliminando la base de datos.");

                            context.Database.EnsureDeleted();

                            Console.WriteLine("Creando la base de datos y cargando los datos de prueba.");
                            Console.WriteLine("Esta operación puede tardar unos segundos");

                            context.Database.Migrate();

                            DbInitializer.Initialize(context);
                            break;

                        case "prod":
                        default:
                            Console.WriteLine("Inicializando en modo Producción:");


                            Console.WriteLine("Aplicando las migrations.");
                            Console.WriteLine("Esta operación puede tardar unos segundos");

                            context.Database.Migrate();

                            break;
                    }


                }
                catch (Exception ex)
                {
                    Console.BackgroundColor = ConsoleColor.Red;

                    Console.WriteLine("Ha ocurrido el siguiente error al ejecutar la herramienta");
                    Console.WriteLine(ex.Message);

                    if (ex.InnerException != null)
                    {
                        Console.WriteLine(ex.InnerException.Message);
                    }

                    var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding the database.");

                    Console.ResetColor();

                    CountDown();

                    return -1;

                }

                Console.WriteLine("Fin del proceso");


                CountDown();

                return 0;
            });

            app.Execute(args);

        }

        private static void CountDown()
        {
            Console.WriteLine("");
            Console.Write("Esta ventana se cerrará en ");

            for (int i = 9; i >= 0; i--)
            {
                Console.Write(Convert.ToString(i));
                Thread.Sleep(1000);
                Console.Write("\b");
            }
        }
    }
}
