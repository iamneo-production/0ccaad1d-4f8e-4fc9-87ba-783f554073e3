using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class LoginModel
    {
        [Key]
        public string email { get; set; }
        public string password { get; set; }
  
    }
}
