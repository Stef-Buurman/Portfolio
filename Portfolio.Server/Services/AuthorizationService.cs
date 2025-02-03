namespace Portfolio.Server.Services
{
    public class AuthorizationService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthorizationService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GenerateApiKey()
        {
            _httpContextAccessor.HttpContext?.Session.Remove("ApiKey");

            var apiKey = Guid.NewGuid().ToString();
            _httpContextAccessor.HttpContext?.Session.SetString("ApiKey", apiKey);

            return apiKey;
        }
    }
}
