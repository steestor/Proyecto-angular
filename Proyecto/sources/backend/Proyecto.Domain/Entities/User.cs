using ITI.Core.Domain.Entities;
using ITI.Core.Domain.Entities.Audit;
using ITI.Core.Domain.Entities.Concurrency;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ITI.Core;

namespace Proyecto.Domain.Entities
{
    public class User : IdentityUser<int>, IEntity<int>, IHaveConcurrencyToken, ISoftDeleteAudited, IAudited
    {


        public bool IsTransient => this.Id == default(int);

        public byte[] Version { get; set; }

        public DateTime? DeletionDate { get; set; }

        public int? DeleteUserId { get; set; }

        public bool IsDeleted { get; set; }

        public int? CreatorUserId { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime? LastModificationDate { get; set; }

        public int? LastModificationUserId { get; set; }

        public IList<UserRole> Roles { get; protected set; }

        public User AnyadirRol(Role rol)
        {
            Check.NotNull(rol, nameof(rol));

            if (Roles == null)
            {
                Roles = new List<UserRole>();
            }

            if (Roles.Any(x => x.RoleId == rol.Id))
            {
                throw new InvalidOperationException("El usuario ya tiene el rol");
            }


            Roles.Add(new UserRole() { UserId = this.Id, RoleId = rol.Id });

            return this;
        }
    }
}
