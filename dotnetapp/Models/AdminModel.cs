using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class AdminModel
    {
        [Key]
        public string email { get; set; }
        public string password { get; set; }
        public string mobileNumber { get; set; }
        public string userRole { get; set; }
    }
}
