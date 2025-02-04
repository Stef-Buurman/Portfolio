using Portfolio.Server.Models;
using Portfolio.Server.Utils;
using SQLite;

namespace Portfolio.Server.Services
{
    public class ContactService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly SQLiteAsyncConnection _db;

        public ContactService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _db = Globals.GetDatabase();
        }

        public void UploadContact(Contact contact)
        {
            _db.InsertAsync(contact);
        }

        public async Task<List<Contact>> GetContacts()
        {
            return await _db.Table<Contact>().ToListAsync();
        }
    }
}
