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
            try
            {
                var apiKey = _authorizationService.GenerateApiKey();

                return Ok(new { apiKey });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in CreateApiKey: {ex.Message}");
                return StatusCode(500, "An error occurred while creating the API key.");
            }
        }
    }
}
