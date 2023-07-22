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
