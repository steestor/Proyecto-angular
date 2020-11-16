using ITI.Core.Runtime;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Proyecto.WebApi.Controllers
{
    /// <summary>
    /// Api para validar la conexión con el servidor.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]

    public class PingController : ControllerBase
    {

        private IPrincipalAccessor PrincipalAccessor { get; set; }


        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="principalAccessor"></param>
        public PingController(IPrincipalAccessor principalAccessor)
        {
            this.PrincipalAccessor = principalAccessor;
        }

        /// <summary>
        /// Obtiene un OK para el usuario autenticado
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string Get()
        {
            
            var userName = this.PrincipalAccessor.Principal.FindFirst(ClaimTypes.NameIdentifier).Value;

            var email = this.PrincipalAccessor.Principal.FindFirst(ClaimTypes.Email).Value;

            return string.Format("Ok : {0} ({1})", userName, email);
        }
    }
}
