using ITI.Core;
using ITI.Core.AspNetCore;
using ITI.Core.AspNetCore.WebApi;
using ITI.Core.AspNetCore.WebApi.Filters;
using ITI.Core.Features.Application;
using ITI.Core.ObjectMapper.AutoMapper;
using ITI.Core.Persistence.EntityFrameworkCore;
using ITI.Core.RealTime.SignalR;
using ITI.Core.Scheduling.Quartz;
using Proyecto.Application.Features.ScheduledTasks;
using Proyecto.Persistence.EntityFramework;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNet.OData.Formatter;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto.WebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private string projectName;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            projectName = this.GetType().Assembly.GetName().Name;
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            var basePath = PlatformServices.Default.Application.ApplicationBasePath;
            var xmlPath = Path.Combine(basePath, string.Format("{0}.xml", projectName));

            // Añadimos Swagger
            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc(name: "v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = Configuration["Swagger:Title"],
                    Version = "v1",
                    Contact = new Microsoft.OpenApi.Models.OpenApiContact()
                    {
                        Name = "INSTITUTO TECNOLÓGICO DE INFORMÁTICA (ITI)",
                        Email = "info@iti.es",
                        Url = new Uri("https://www.iti.es/")
                    }
                });

                x.AddSecurityDefinition("Bearer",
                    new OpenApiSecurityScheme
                    {
                        Description = "JWT Authorization header using the Bearer scheme.",
                        Type = SecuritySchemeType.Http,
                        Scheme = "bearer"
                    });

                x.AddSecurityRequirement(new OpenApiSecurityRequirement{
                    {
                        new OpenApiSecurityScheme{
                            Reference = new OpenApiReference{
                                Id = "Bearer",
                                Type = ReferenceType.SecurityScheme
                            }
                        },new List<string>()
                    }
                });

                x.IncludeXmlComments(xmlPath);
            });

            //Añadimos CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithExposedHeaders("Content-Disposition");
                    });
            });

            //Configuramos Autenticación por TOKEN JWT.

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                 .AddJwtBearer(options =>
                 {
                     options.TokenValidationParameters = new TokenValidationParameters
                     {
                         ValidateIssuer = true,
                         ValidateAudience = true,
                         ValidateLifetime = true,
                         ValidateIssuerSigningKey = true,
                         ValidIssuer = Configuration["Jwt:Issuer"],
                         ValidAudience = Configuration["Jwt:Issuer"],
                         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                     };

                     options.Events = new JwtBearerEvents
                     {
                         OnMessageReceived = context =>
                         {
                             var accessToken = context.Request.Query["access_token"];

                             // If the request is for our hub...
                             var path = context.HttpContext.Request.Path;
                             if (!string.IsNullOrEmpty(accessToken) &&
                                 (path.StartsWithSegments("/userChannelHub")))
                             {
                                 // Read the token out of the query string
                                 context.Token = accessToken;
                             }
                             return Task.CompletedTask;
                         }
                     };
                 });

            //Configuramos EntityFramework

            services.AddDbContext<DbContextProyecto>(options => options
                .UseLazyLoadingProxies()
                .UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddLocalization();

            services.AddOData();

            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(ValidateModelStateAttribute));

                var policy = new AuthorizationPolicyBuilder()
                  .RequireAuthenticatedUser()
                  .Build();

                options.Filters.Add(new AuthorizeFilter(policy));

                options.EnableEndpointRouting = false;

                foreach (var outputFormatter in options.OutputFormatters.OfType<ODataOutputFormatter>().Where(_ => _.SupportedMediaTypes.Count == 0))
                {
                    outputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }
                foreach (var inputFormatter in options.InputFormatters.OfType<ODataInputFormatter>().Where(_ => _.SupportedMediaTypes.Count == 0))
                {
                    inputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }
            });

            //Añadimos SignalR
            services.AddSignalR().AddJsonProtocol(options => { options.PayloadSerializerOptions.PropertyNamingPolicy = null; });

            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                  .RequireAuthenticatedUser()
                  .Build();
            });

            //Añadimos los componentes de ITI.Core
            BootStrapper bootStrapper = new BootStrapper(services)
                            .UseEntityFrameworkCore<DbContextProyecto>()
                            .UseAutoMapper()
                            .UseQuartz()
                            .UseSignalR()
                            .UseTempFilesApi(Configuration["FolderStoreKeeper:BaseDir"])
                            .UseScheduledTasks<TareasProgramadasStore>();

            return services.AddITICore(bootStrapper);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            //Configuramos ITI.Core

            app.UseITICore(loggerFactory).UseWebApiExceptionHandler();

            if (env.IsDevelopment())
            {
            }

            app.ConfigureUserChannelWithSignalR();

            app.UseCors("AllowAll");

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(url: "/swagger/v1/swagger.json", name: "MH5 Api");
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseMvc();
        }
    }
}
