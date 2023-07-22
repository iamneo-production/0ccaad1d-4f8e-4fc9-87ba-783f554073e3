using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.DataBase;
using System.Linq;
using dotnetapp.Services;
using System.Text.RegularExpressions;

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
        public IActionResult AddUser([FromBody] UserModel data,[FromServices] IEmailService emailService)
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


                    //Trigger mail
                    var recipientEmail=data.email;
                    var subject="User Profile created successfully";
                    var body = @"<p style=""font-family: Arial, sans-serif; font-size: 14px; color: #333; margin-bottom: 10px;"">Dear User,</p>
                <p style=""font-family: Arial, sans-serif; font-size: 14px; color: #333; margin-bottom: 10px;"">Thank you for signing up!.</p>
                <p style=""font-family: Arial, sans-serif; font-size: 14px; color: #333; margin-bottom: 10px;"">Your Profile has been created successfully</p>
                <p style=""font-family: Arial, sans-serif; font-size: 14px; color: #333; margin-bottom: 10px;"">Thanks and regards,</p>
                <p style=""font-family: Arial, sans-serif; font-size: 14px; color: #333; margin-bottom: 10px;"">Joyfulgivers</p>
                <p style=""font-family: Arial, sans-serif; font-size: 14px; color: #333; margin-bottom: 10px;"">Customized Nameboard Team</p>";

                    emailService.SendEmail(recipientEmail, subject, body);
                                           
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

                    
                    var recipientEmail=data.email;
                    var subject="Invitation to Join as an Admin - Gift and Theme Management";
                    var body = @" <html> <head> <meta charset='UTF-8'> 
                    <title>Admin Signup for Gift and Theme Management</title> 
                    <style> .important { font-weight: bold; color: red; } </style> 
                    </head> <body> <p>Dear <span class='important'>Admin,</span>,</p> <p>We hope this email finds you well. We are reaching out to you with an exciting opportunity to be a part of our esteemed team responsible for managing gifts and themes within our organization.</p> 
                    <p>As an experienced and reliable administrator, we value your expertise and believe that your contributions will significantly enhance our gift and theme management processes. Your involvement in tasks such as adding, editing, updating, and deleting gifts and themes will ensure a seamless and personalized experience for our recipients.</p> 
                    <p>We kindly request your participation in signing up as an admin for gift and theme management. By taking on this role, you will have the authority to oversee the selection, modification, and removal of gifts and themes, ensuring that our offerings align with our organizational values and the preferences of our recipients.</p> 
                    <p>Your commitment and attention to detail will greatly contribute to the success of our gift and theme management system. We anticipate that your valuable input will help us create an engaging and enjoyable experience for everyone involved.</p> 
                    <p>We appreciate your dedication and willingness to contribute to our organization's success. Your expertise and insights will make a significant difference in providing memorable experiences for our recipients.</p> <p>Thank you for considering this opportunity, and we look forward to having you on board as an admin for gift and theme management.
                    </p> <p>Best regards,</p> <p><span class='important'>Joyfulgivers</span></p> 
                    <p><span class='important'></span></p> <p><span class='important'>Customized Nameboard Team</span></p> </body> </html> "; 

                    emailService.SendEmail(recipientEmail, subject, body);

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

        //Change password
        [HttpPut]
        [Route("resetpassword")]
        public IActionResult ChangePassword(LoginModel updateddata)
        {

            //Check if email is in user table
            var user = _context.Users.FirstOrDefault(u => u.email == updateddata.email);
            if(user!=null)
            {
              user.password=updateddata.password; 
              var login=_context.Login.FirstOrDefault(l => l.email == updateddata.email);
              if(login!=null)
              {
                login.password=updateddata.password;
              }
              _context.SaveChanges();
              return Ok(new
                {
                    Message = "Password updated Successfully"
                });
            }
             
            //Check if email is in admin table
            var admin = _context.Users.FirstOrDefault(u => u.email == updateddata.email);
            if(admin!=null)
            {
              admin.password=updateddata.password; 
              var login=_context.Login.FirstOrDefault(l => l.email == updateddata.email);
              if(login!=null)
              {
                login.password=updateddata.password;
              }
              _context.SaveChanges();
              return Ok(new
                {
                    Message = "Password updated Successfully"
                });
            }
            return NotFound("Invalid email");
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
