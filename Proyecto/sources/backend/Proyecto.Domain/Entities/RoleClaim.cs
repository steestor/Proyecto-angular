using ITI.Core.Domain.Entities.Security;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

using System.Text;

namespace Proyecto.Domain.Entities
{
    public class RoleClaim : IdentityRoleClaim<int>, IPermission
    {
               

        public string Name => ClaimValue;

        public string Identifier => ClaimType;
    }
}
