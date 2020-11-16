using ITI.Core.Application;
using ITI.Core.Dependency.LifeTimes;
using Proyecto.Application.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Proyecto.Application.Services
{
    public interface IProductCommandService : ICommandService<ProductDto, int>
    {


    }
}
