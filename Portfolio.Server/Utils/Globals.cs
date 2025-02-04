using Portfolio.Server.Models;
using SQLite;

namespace Portfolio.Server.Utils
{
    public static class Globals
    {
        private static string databasePath = "Database/Portfolio.db";
        private static SQLiteAsyncConnection? _db;
        public static SQLiteAsyncConnection GetDatabase()
        {
            if (_db == null)
            {
                if (!System.IO.Directory.Exists("Database"))
                {
                    System.IO.Directory.CreateDirectory("Database");
                }
                _db = new SQLiteAsyncConnection(databasePath);
                _db.CreateTableAsync<Contact>().Wait();
            }
            return _db;
        }
    }
}
