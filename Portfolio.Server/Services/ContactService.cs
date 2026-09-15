using Portfolio.Server.Models;
using Portfolio.Server.Utils;
using SQLite;

namespace Portfolio.Server.Services
{

    public class ContactService
    {
        private readonly SQLiteAsyncConnection _db = Globals.GetDatabase();

        public Task<int> UploadContact(Contact contact, CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();
            return _db.InsertAsync(contact);
        }

        public Task<List<Contact>> GetContacts() =>
            _db.Table<Contact>().ToListAsync();

        public Task<int> DeleteContact(int id) =>
            _db.DeleteAsync<Contact>(id);
    }
}