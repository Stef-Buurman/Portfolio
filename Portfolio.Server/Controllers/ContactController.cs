using Microsoft.AspNetCore.Mvc;
using Portfolio.Server.Filters;
using Portfolio.Server.Models;
using Portfolio.Server.Services;

namespace Portfolio.Server.Controllers
{

    [ApiController]
    [Route("api")]
    public class ContactController(ContactService contactService) : ControllerBase
    {
        [HttpPost("contact")]
        [ApiKeyActionFilter]
        public async Task<IActionResult> UploadContact(
            [FromBody] Contact contact,
            CancellationToken cancellationToken)
        {
            await contactService.UploadContact(contact, cancellationToken);
            return NoContent();
        }

        [HttpGet("contacts")]
        [ContactListFilter]
        public async Task<ActionResult<IReadOnlyList<Contact>>> GetContacts()
        {
            return Ok(await contactService.GetContacts());
        }

        [HttpDelete("contact/{id:int}")]
        [ContactListFilter]
        public async Task<IActionResult> DeleteContact(int id)
        {
            await contactService.DeleteContact(id);
            return NoContent();
        }
    }
}