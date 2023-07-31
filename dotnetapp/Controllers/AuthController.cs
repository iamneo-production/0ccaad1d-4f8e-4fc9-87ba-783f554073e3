using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using dotnetapp.DataBase;
using dotnetapp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using dotnetapp.Dto;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("")]
    public class AuthController : ControllerBase
    {
        private readonly DataDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public AuthController(DataDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost("user/login")]
        [AllowAnonymous]
        public IActionResult LoginUser([FromBody] LoginModel loginModel)
        {
            // Check if user exists and credentials are correct
            bool isUserPresent = IsUserPresent(loginModel);

            if (isUserPresent)
            {
                // Redirect to user's home page

                return Created("Success", loginModel);
            }
            else
            {
                // Invalid credentials
                return Created("User does not exist or invalid credentials.", loginModel);
            }
        }

        [HttpPost("admin/login")]
        [AllowAnonymous]
        public IActionResult LoginAdmin([FromBody] LoginModel loginModel)
        {
            // Check if user exists and credentials are correct
            bool isAdminPresent = IsAdminPresent(loginModel);

            if (isAdminPresent)
            {
                // Redirect to admin's home page
                return Created("Success", loginModel);
            }
            else
            {
                // Invalid credentials
                return Created("User does not exist or invalid credentials.", loginModel);
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            bool isAdminPresent=IsAdminPresent(loginModel);
            bool isUserPresent=IsUserPresent(loginModel);
            if(isAdminPresent)
            {
                var admin =new {userRole="admin",email=loginModel.email};
                return Created("Success",admin);
            }
            if(isUserPresent)
            {
                var user=new {userRole="user",email=loginModel.email};
                return Created("Success",user);
            }
            else{
            return NotFound("Invalid credentials.");
            }
        }

        [HttpPost("GetOTP")]
        [AllowAnonymous]
        public IActionResult Getotp([FromBody] ForgetPasstoAdd data,[FromServices] IEmailService emailService)
        {
           bool isPresent = _dbContext.Login.Any(u => u.email == data.email);
           var recipientEmail=data.email;
           if(isPresent){
               var subject="One-Time Password (OTP) || Request for reset password";
               var  body = @"<p style=""font-size: 18px; font-weight: bold;"">One-Time Password (OTP) for Verification</p>
                       <p style=""font-size: 24px; font-weight: bold;"">Your OTP: "+data.Otp+@"</p>
                       <p style=""font-size: 14px;"">If you did not initiate this verification or require any assistance, please contact our support team immediately.</p>
                       <p>Thank you for choosing our services.</p>
                       <p>Best regards,<br>Joyful givers</p>
                       <p><em>Note: This email is automated. Please do not reply to this email.</em></p>"; 
                    
                     //Call to mail trigger function
                    emailService.SendEmail(recipientEmail, subject, body);
                    return Ok(new{message="OTP Generated Successfully"});
           }
           return NotFound("Email does not exist");
           
        }

        [HttpPost("user/save")] 
        [AllowAnonymous]
        public IActionResult SignupUser([FromBody] UserModel userModel)
        {
            // Check if the user already exists
            bool isUserPresent = _dbContext.Users.Any(u => u.email == userModel.email);

            if (isUserPresent)
            {
                return BadRequest("User already exists.");
            }

            // Save the user data in the database
            SaveUser(userModel);

            // Redirect to login page
            return Ok(new
            {
                Message = "Registration Successful"
            });
        }

        [HttpPost("admin/save")]
        [AllowAnonymous]
        public IActionResult SignupAdmin([FromBody] AdminModel adminModel)
        {
            // Check if the admin already exists
            bool isAdminPresent = _dbContext.Admin.Any(a => a.email == adminModel.email);

            if (isAdminPresent)
            {
                return BadRequest("Admin already exists.");
            }

            // Save the admin data in the database
            SaveAdmin(adminModel);

            // Redirect to login page
            return Ok(new
            {
                Message = "Registration Successful"
            });
        }

        private bool IsUserPresent(LoginModel loginModel)
        {
            try
            {
                return _dbContext.Users.Any(u => u.email == loginModel.email && u.password == loginModel.password);
            }
            catch (Exception e)
            {
                Console.WriteLine("The error is" + e);
                return false;
            }
        }

        private bool IsAdminPresent(LoginModel loginModel)
        {
            try
            {
                return _dbContext.Admin.Any(a => a.email == loginModel.email && a.password == loginModel.password);
            }
            catch (Exception e)
            {
                Console.WriteLine("The error is" + e);
                return false;
            }
        }

        private void SaveUser(UserModel userModel)
        {
            if (userModel == null || string.IsNullOrEmpty(userModel.email))
            {
                throw new ArgumentNullException(nameof(userModel), "UserModel or Name cannot be null.");
            }

            // Save the user data to the database
            _dbContext.Users.Add(userModel);
            _dbContext.SaveChanges();
        }

        private void SaveAdmin(AdminModel adminModel)
        {
            if (adminModel == null || string.IsNullOrEmpty(adminModel.email))
            {
                throw new ArgumentNullException(nameof(adminModel), "AdminModel or Name cannot be null.");
            }

            // Save the admin data to the database
            _dbContext.Admin.Add(adminModel);
            _dbContext.SaveChanges();
        }

    }
}
