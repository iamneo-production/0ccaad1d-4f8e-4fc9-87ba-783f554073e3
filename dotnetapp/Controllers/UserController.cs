using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.DataBase;
using System.Linq;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("")]
    public class UserController : ControllerBase
    {
        private readonly DataDbContext _context;

        public UserController(DataDbContext context)
        {
            _context = context;
        }

        // Add user or admin to the application
        [HttpPost]
        [Route("user/signup")]
        public IActionResult AddUser([FromBody] UserModel data)
        {
            var existingUser = _context.Login.FirstOrDefault(l => l.email == data.email);
            if (existingUser != null)
            {
                return Unauthorized("This email is already registered");
            }

            try
            {
                if (data.userRole == "User")
                {
                    var user = new UserModel
                    {
                        email = data.email,
                        password = data.password,
                        username = data.username,
                        mobileNumber = data.mobileNumber,
                        userRole = data.userRole
                    };

                    var login = new LoginModel
                    {
                        email = data.email,
                        password = data.password
                    };

                    _context.Users.Add(user);
                    _context.Login.Add(login);
                    _context.SaveChanges();

                    return Created("Registered successfully", data);
                }
                else if (data.userRole == "Admin")
                {
                    var admin = new AdminModel
                    {
                        email = data.email,
                        password = data.password,
                        mobileNumber = data.mobileNumber,
                        userRole = data.userRole
                    };

                    var login = new LoginModel
                    {
                        email = data.email,
                        password = data.password
                    };

                    _context.Admin.Add(admin);
                    _context.Login.Add(login);
                    _context.SaveChanges();

                    return Created("Registered successfully", data);
                }
                else
                {
                    return Created("Invalid userRole", data);
                }


            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Message = "Error Occured"
                });
            }
        }


        // Get a user by email (userId)
        [HttpGet]
        [Route("{userId}")]
        public IActionResult GetUser(string userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.email == userId);
            if (user != null)
            {
                var userModel = new UserModel
                {
                    email = user.email,
                    password = user.password,
                    username = user.username,
                    mobileNumber = user.mobileNumber,
                    userRole = "User"
                };

                return Ok(userModel);
            }

            var admin = _context.Admin.FirstOrDefault(a => a.email == userId);
            if (admin != null)
            {
                var adminModel = new AdminModel
                {
                    email = admin.email,
                    password = admin.password,
                    mobileNumber = admin.mobileNumber,
                    userRole = "Admin"
                };

                return Ok(adminModel);
            }

            return NotFound();
        }

        // Edit a user
        [HttpPut]
        [Route("edit/{userId}")]
        public IActionResult EditUser(string userId, [FromBody] UserModel updatedData)
        {
            var user = _context.Users.FirstOrDefault(u => u.email == userId);
            if (user != null)
            {
                user.email = updatedData.email;
                user.password = updatedData.password;
                user.username = updatedData.username;
                user.mobileNumber = updatedData.mobileNumber;

                var login = _context.Login.FirstOrDefault(l => l.email == userId);
                if (login != null)
                {
                    login.password = updatedData.password;
                }

                _context.SaveChanges();

                return Ok(new
                {
                    Message = "Updated Successfully"
                });
            }

            var admin = _context.Admin.FirstOrDefault(a => a.email == userId);
            if (admin != null)
            {
                admin.email = updatedData.email;
                admin.password = updatedData.password;
                admin.mobileNumber = updatedData.mobileNumber;

                var login = _context.Login.FirstOrDefault(l => l.email == userId);
                if (login != null)
                {
                    login.password = updatedData.password;
                }

                _context.SaveChanges();

                return Ok(new
                {
                    Message = "Updated Successfully"
                });
            }

            return NotFound();
        }

        // Delete a user
        [HttpDelete]
        [Route("delete/{userId}")]
        public IActionResult DeleteUser(string userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.email == userId);
            if (user != null)
            {
                _context.Users.Remove(user);

                var login = _context.Login.FirstOrDefault(l => l.email == userId);
                if (login != null)
                {
                    _context.Login.Remove(login);
                }

                _context.SaveChanges();

                return Ok(new
                {
                    Message = "Deleted successfully"
                });
            }

            var admin = _context.Admin.FirstOrDefault(a => a.email == userId);
            if (admin != null)
            {
                _context.Admin.Remove(admin);

                var login = _context.Login.FirstOrDefault(l => l.email == userId);
                if (login != null)
                {
                    _context.Login.Remove(login);
                }

                _context.SaveChanges();

                return Ok(new
                {
                    Message = "Deleted Successfully"
                });
            }

            return NotFound();
        }
    }
}
