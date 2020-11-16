using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITI.Core.Application;
using ITI.Core.AspNetCore.WebApi;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proyecto.Application.Dto;
using Proyecto.Application.Services;

namespace Proyecto.WebApi.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ProductController : ApiControllerBase<int, ProductDto, ProductDto>
    {
        private IProductCommandService CommandService { get; set; }

        public ProductController(IProductCommandService commandService, IProductQueryService queryService) : base(commandService, queryService)
        {
            CommandService = commandService;
        }
    }
}
