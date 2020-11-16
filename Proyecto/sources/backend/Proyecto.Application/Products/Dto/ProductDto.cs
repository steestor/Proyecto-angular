using ITI.Core.Application.Dtos;
using ITI.Core.ObjectMapper;
using Proyecto.Domain.Entities;
using Proyecto.Domain.EntitiesDto;

namespace Proyecto.Application.Dto
{
    [MapTo(typeof(ProductDomainDto))]
    [MapFrom(typeof(Product))]
    public class ProductDto : IEntityDto<int>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public int Quantity { get; set; }
    }
}
