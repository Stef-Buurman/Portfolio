using System.ComponentModel.DataAnnotations;
using SQLite;

namespace Portfolio.Server.Models
{
    public class Contact
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }

        [Required, StringLength(80)]
        public string FirstName { get; set; } = string.Empty;

        [Required, StringLength(80)]
        public string LastName { get; set; } = string.Empty;

        [Required, StringLength(160)]
        public string Company { get; set; } = string.Empty;

        public EmployeeCount EmployeeCount { get; set; }

        [Required, StringLength(2000)]
        public string CompanyInformation { get; set; } = string.Empty;

        [Required, EmailAddress, StringLength(254)]
        public string Email { get; set; } = string.Empty;

        [Phone, StringLength(40)]
        public string? Phone { get; set; }

        [StringLength(4000)]
        public string Message { get; set; } = string.Empty;
    }
}