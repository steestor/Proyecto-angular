using ITI.Core.Domain.Entities;
using ITI.Core.Domain.Entities.Security;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Proyecto.Domain.Entities
{
    public class Role : IdentityRole<int>, IRole<RoleClaim>, IEntity<int>
    {
        public string Description { get; set; }

        public IList<RoleClaim> Permissions { get; protected set; }

        public bool IsTransient => Id == default(int);

        public IList<UserRole> Usuarios { get; protected set; }

        public IRole<RoleClaim> AddPermission(string name, string identifier)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(identifier))
            {
                throw new ArgumentNullException("permission");
            }


            if (Permissions == null)
            {
                Permissions = new List<RoleClaim>();
            }

            if (!Permissions.Any(x => x.Identifier == identifier))
            {
                Permissions.Add(new RoleClaim() { ClaimType = identifier, ClaimValue = name });
            }

            return this;
        }
    }
}
