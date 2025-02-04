using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Portfolio.Server.Models;
using System.Text.Json;

namespace Portfolio.Server.Filters
{
    public class ContactListFilter : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext actionContext, ActionExecutionDelegate next)
        {
            var context = actionContext.HttpContext;
            if (!context.Request.Headers.ContainsKey("Authorization"))
            {
                Console.WriteLine("--------");
                context.Response.StatusCode = 401;
                return;
            }

            var contactListOptions =
              context.RequestServices.GetService<IOptions<ContactListOptions>>() switch
              {
                  { Value: var __ } => __,
                  _ => new ContactListOptions() { Authorization = Guid.NewGuid().ToString() }
              };
            Console.WriteLine(JsonSerializer.Serialize(contactListOptions));
            if (context.Request.Headers["Authorization"] != contactListOptions.Authorization)
            {
                context.Response.StatusCode = 401;
                return;
            }
            await next();
        }
    }
}
