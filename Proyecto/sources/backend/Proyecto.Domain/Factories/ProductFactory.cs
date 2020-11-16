using Proyecto.Domain.Entities;
using Proyecto.Domain.EntitiesDto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Proyecto.Domain.Factories
{
    public static class ProductFactory
    {

        public static Product CrearProduct(ProductDomainDto productDomainDto)
        {
            Product product = new Product();
            product.Name = productDomainDto.Name;
            return product;
        }
    }
}
