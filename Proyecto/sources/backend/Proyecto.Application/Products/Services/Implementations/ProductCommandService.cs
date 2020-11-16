using ITI.Core.Application;
using ITI.Core.Application.Providers;
using ITI.Core.Authorization;
using ITI.Core.ObjectMapper;
using ITI.Core.Persistence.Repositories;
using Proyecto.Application.Dto;
using Proyecto.Domain.Entities;
using Proyecto.Persistence.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Proyecto.Application.Services
{
    public class ProductCommandService : CommandServiceBase<Product, int, ProductDto>, IProductCommandService
    {
        public ProductCommandService(ICrudPermissions<Product, int> permissions, ICrudProvider<Product, ProductDto, int> crudProvider, IObjectMapper objectMapper, IAuthorizationProvider authorizationProvider) : base(permissions, crudProvider, objectMapper, authorizationProvider)
        {
        }
    }
}
