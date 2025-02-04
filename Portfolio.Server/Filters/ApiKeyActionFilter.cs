using Microsoft.AspNetCore.Mvc.Filters;

namespace Portfolio.Server.Filters
{
    public class ApiKeyActionFilter : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext actionContext, ActionExecutionDelegate next)
        {
            var context = actionContext.HttpContext;
            if (!context.Request.Headers.ContainsKey("Authorization"))
            {
                context.Response.StatusCode = 401;
                return;
            }

            var apiKey = context.Session.GetString("ApiKey");

            if (context.Request.Headers["Authorization"] != apiKey)
            {
                context.Response.StatusCode = 401;
                return;
            }
            await next();
        }
    }
}
