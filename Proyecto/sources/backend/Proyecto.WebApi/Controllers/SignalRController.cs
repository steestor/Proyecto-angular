using ITI.Core.RealTime;
using Proyecto.Application.Authentication.Dtos;
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
    public class SignalRController : ControllerBase
    {

        private IBroadcastService broadcastService { get; set; }

        /// <summary>
        /// Constructor 
        /// </summary>
        /// <param name="broadcastService"></param>
        public SignalRController(IBroadcastService broadcastService)
        {
            this.broadcastService = broadcastService;
        }

        [HttpGet]
        public string Get()
        {
            var time = DateTime.Now.ToLongTimeString();

            var userName = this.broadcastService.SendMessage("evtTime", time);

            return time;
        }
    }
}