using Proyecto.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace Proyecto.Persistence.EntityFramework
{
    public static class DbInitializer
    {
        public static void Initialize(DbContextProyecto context)
        {
            context.Database.EnsureCreated();

            if (context.Usuarios.Any())
            {
                return;   // DB has been seeded
            }

            var user = new User
            {
                UserName = "demo123",
                Email = "example1@gmail.com",
                NormalizedUserName = "DEMO123",
                PasswordHash = GetHashedPwd(),
                SecurityStamp = Guid.NewGuid().ToString()
            };

            context.Usuarios.Add(user);

            if (!context.Products.Any())
            {
                var product = new Product
                {
                    Name = "Patatas",
                    Price = 1.2,
                    Description = "Patatas pequeñas para gastronomía gourmet",
                    Quantity = 22
                };
                var product2 = new Product
                {
                    Name = "Fruta",
                    Price = 3.4,
                    Description = "Mix de verduras de la zona",
                    Quantity = 17
                };
                var product3 = new Product
                {
                    Name = "Pan",
                    Price = 1.3,
                    Description = "Pan de avena",
                    Quantity = 15
                };

                context.Products.Add(product);
                context.Products.Add(product2);
                context.Products.Add(product3);
            }

            context.SaveChanges();
        }

        private static string GetHashedPwd()
        {
            return "AQAAAAEAACcQAAAAEIfFGi9vde94Gchb2MxHpL9JzkOTVXnw5ApSM8IAEH33SyMFSg1YpcecKjlf7EhPnw==";
        }
    }
}
