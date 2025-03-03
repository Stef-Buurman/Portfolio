﻿using Microsoft.AspNetCore.Mvc;
using Portfolio.Server.Filters;
using Portfolio.Server.Models;
using Portfolio.Server.Services;

namespace Portfolio.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class ContactController : ControllerBase
    {
        private readonly ContactService _contactService;

        public ContactController(ContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost("contact")]
        [ApiKeyActionFilter]
        public IActionResult UploadContact([FromBody] Contact contact)
        {
            _contactService.UploadContact(contact);
            return Ok();
        }

        [HttpGet("contacts")]
        [ContactListFilter]
        public async Task<IActionResult> GetContacts()
        {
            var contacts = await _contactService.GetContacts();
            return Ok(contacts);
        }

        [HttpDelete("contact/{id}")]
        [ContactListFilter]
        public async Task<IActionResult> DeleteContact(int id)
        {
            await _contactService.DeleteContact(id);
            return Ok();
        }
    }
}
