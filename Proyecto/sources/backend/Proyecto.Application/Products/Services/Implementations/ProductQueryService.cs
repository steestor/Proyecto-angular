using ITI.Core.Application;
using ITI.Core.Authorization;
using ITI.Core.ObjectMapper;
using ITI.Core.Persistence.Repositories;
using Proyecto.Application.Dto;
using Proyecto.Domain.Entities;
using System.Linq;

namespace Proyecto.Application.Services
{
    public class ProductQueryService : QueryServiceBase<ProductDto, Product>, IProductQueryService
    {
        public ProductQueryService(IReadOnlyRepository<Product> queryRepository, IObjectProjector objectProjector, IAuthorizationProvider authorizationProvider)
            : base(queryRepository, objectProjector, authorizationProvider)
        {
        }
        protected override string Permission => "Read_Product";

        protected override IOrderedQueryable<Product> OrderBy(IQueryable<Product> entries)
        {
            return entries.OrderBy(x => x.Id);
        }
    }
}
