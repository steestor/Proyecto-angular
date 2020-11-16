using ITI.Core.Persistence.EntityFrameworkCore;
using ITI.Core.Runtime;
using Proyecto.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using ITI.Core;

namespace Proyecto.Persistence.EntityFramework
{
    public class DbContextProyecto : ITIDbContext
    {
        public DbSet<User> Usuarios { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleClaim> RoleClaims { get; set; }
        public DbSet<UserClaim> UserClaims { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<UserToken> UserTokens { get; set; }
        public DbSet<Product> Products { get; set; }

        public DbSet<TareaProgramada> TareasProgramadas { get; set; }

        public DbContextProyecto(DbContextOptions options, IApplicationContext applicationContext, IUserSession userSession) : base(options, applicationContext, userSession)
        {

        }

        private const string NombreTablaUsuarios = "Usuarios";
        private const string NombreTablaTareasProgramadas = "TareasProgramadas";

        protected override void Configuring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void ModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TareaProgramada>().ToTable(NombreTablaTareasProgramadas).HasKey(x => x.Id);


            modelBuilder.Entity<User>().ToTable(NombreTablaUsuarios).HasKey(x => x.Id);

            modelBuilder.Entity<UserRole>()
            .HasKey(bc => new { bc.UserId, bc.RoleId });

            modelBuilder.Entity<UserRole>().HasOne(x => x.User).WithMany(x => x.Roles).HasForeignKey(x => x.UserId);

            modelBuilder.Entity<UserRole>().HasOne(x => x.Role).WithMany(x => x.Usuarios).HasForeignKey(x => x.RoleId);

            modelBuilder.Entity<Role>().HasMany(x => x.Permissions).WithOne().HasForeignKey(x => x.RoleId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
