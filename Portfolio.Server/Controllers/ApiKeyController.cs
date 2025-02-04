using Microsoft.AspNetCore.Mvc;
using Portfolio.Server.Services;

namespace Portfolio.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class ApiKeyController : ControllerBase
    {
        private readonly AuthorizationService _authorizationService;

        public ApiKeyController(AuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
        }

        [HttpGet("create-api-key")]
        public IActionResult CreateApiKey()
        {
            var apiKey = _authorizationService.GenerateApiKey();
            return Ok(new { apiKey });
        }
    }
}
