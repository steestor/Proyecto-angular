using Proyecto.Application.Authentication.Dtos;
using Proyecto.Application.Authentication.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Proyecto.Api.Controllers
{
    /// <summary>
    /// Api para iniciar sesión en la aplicación
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {

        private ILoginService Loginservice { get; set; }

        /// <summary>
        /// Constructor 
        /// </summary>
        /// <param name="loginService"></param>
        public LoginController(ILoginService loginService)
        {
            this.Loginservice = loginService;
        }

        /// <summary>
        /// Valida las credenciales del usuario y genera un token.
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<LoginResultDto> Post([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                throw new InvalidOperationException();
            }

            return await this.Loginservice.IniciarSesion(dto);

        }
    }
}