using ITI.Core;
using ITI.Core.Application.EntityMapper;
using ITI.Core.ObjectMapper;
using Proyecto.Application.Dto;
using Proyecto.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Proyecto.Application.Products.EntityMapper
{
    class ProductEntityMapper : IEntityMapper<Product, int, ProductDto>
    {
        private IObjectMapper ObjectMapper { get; set; }

        public ProductEntityMapper(IObjectMapper objectMapper)
        {
            ObjectMapper = objectMapper;
        }
        public Product CreateEntityFromDto(ProductDto dto)
        {
            var entity = new Product();
            UpdateEntityFromDto(dto, entity);
            return entity;
        }

        public void UpdateEntityFromDto(ProductDto dto, Product entity)
        {
            Check.NotNull(entity, nameof(entity));
            Check.NotNull(dto, nameof(dto));
        }
    }
}
