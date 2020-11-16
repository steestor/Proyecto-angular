using ITI.Core.Authorization;
using ITI.Core.Startup;
using Proyecto.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Proyecto.Application.Identity
{
    public class IdentityRegistrar : IRegistrar
    {
        public void RegisterComponents(IServiceCollection services, IAssembliesProvider assembliesProvider)
        {
            services.AddScoped<IUserStore<User>, UserStore>();
            services.AddScoped<IRoleStore<Role>, RoleStore>();

            services.AddIdentityCore<User>().AddRoles<Role>().AddErrorDescriber<MultilanguageIdentityErrorDescriber>();
            services.AddScoped<IAuthorizationProvider, NullAuthorizationProvider>();
        }
    }
}
