using Portfolio.Server.Models;
using Portfolio.Server.Utils;

namespace Portfolio.Server.Services
{
    public class ContactService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ContactService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public void UploadContact(Contact contact)
        {
            var db = Globals.GetDatabase();
            db.InsertAsync(contact);
        }
    }
}
