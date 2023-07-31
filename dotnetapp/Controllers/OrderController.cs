using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using dotnetapp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.DataBase;
using dotnetapp.Dto;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("")]
    public class OrderController : ControllerBase
    {
        private readonly DataDbContext _context;
        
        // private readonly IEmailService _emailservice;
        public OrderController(DataDbContext context)
        {
            _context = context;
            // _emailservice=emailservice;
        }

        [HttpGet("admin/getAllOrders")]
        public IActionResult GetAllOrders()
        {
            try
            {
                var orders = _context.Orders
                    .Include(o => o.Theme)
                    .Include(o => o.Gift)
                    .ToList();
                if (orders.Count == 0)
                {
                    return BadRequest("Orders not found");
                }
                return Ok(new { success = true, message = "Retrives all the order details", orders });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, message = e.Message });
            }
        }

        // GET 2: api/order/{id}
        [HttpGet("/admin/getorder/{id}")]
        public IActionResult GetOrder(int id)
        {
            try
            {
                var order = _context.Orders
                    .Include(o => o.Theme)
                    .Include(o => o.Gift)
                    .FirstOrDefault(o => o.OrderId == id);

                if (order == null)
                {
                    return NotFound("Order not found");
                }

                return Ok(new { success = true, message = "Order selected", order });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }

        //GET 3: api/order/email
        [HttpGet("user/Myorders/{email}")]
        public IActionResult Myorders(string email)
        {
            try
            {

                var order = _context.Orders?    
                    .Where(o => o.OrderEmail == email)
                    .Include(o => o.Theme)
                    .Include(o => o.Gift).ToList();

                if (order.Count == 0)
                {
                    return NotFound("Order not found");
                }
                return Ok(new { success = true, message = $"{email} order details retrived successfully", order });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, messsage = e.Message });
            }
        }

        // POST: api/order
        [HttpPost("user/addOrder")]
        public IActionResult CreateOrder(OrdertoAdd order)
        {
            try
            {
                var theme = _context.Themes?.FirstOrDefault(t => t.ThemeId == order.ThemeId);
                var gift = _context.Gifts?.FirstOrDefault(g => g.GiftId == order.GiftId);

                if (theme == null || gift == null)
                {
                    return BadRequest("Invalid Theme or Gift ID");
                }
                if (order.OrderQuantity > gift.GiftQuantity)
                {
                    return NotFound("No gift stock available");
                }
                gift.GiftQuantity = gift.GiftQuantity - order.OrderQuantity; //update gift quantity

                var newOrder = new OrderModel
                {
                    OrderName = order.OrderName,
                    OrderDescription = order.OrderDescription,
                    Theme = theme,
                    Gift = gift,
                    OrderDate = order.OrderDate,
                    OrderPrice = order.OrderPrice,
                    OrderAddress = order.OrderAddress,
                    OrderQuantity = order.OrderQuantity,
                    OrderPhone = order.OrderPhone,
                    OrderEmail = order.OrderEmail
                };


                _context.Orders?.Add(newOrder);
                _context.SaveChanges();



                return Ok(new { success = true, message = "Order added", newOrder });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }

        //POST : api/orderConfirmation [After payment order details mail to customer]
        [HttpPost("user/orderConfirmation")]
        public async Task<IActionResult> Orderconfirmation([FromBody] OrderconfirmtoAdd orders,[FromServices] IEmailService emailService){
            try{
                var recipientEmail=orders.MailId;
                var subject = "Order Confirmation";

                //Styles
                var body=@"<!DOCTYPE html> <html> <head><style> 
                body { font-family: Arial, sans-serif; line-height: 1.5; color:black; } 
                table { width: 100%; border-collapse: collapse; margin-top: 20px; } 
                th, td { padding: 10px; border: 1px solid #dddddd; } </style> </head>";

                if(subject==null)
                   subject="Order Confirmation";


                body+=@"<body><h1 style='color: #0088cc;'>Thank you for placing your order with JoyFul Givers!</h1> 
                <p>We are pleased to inform you that we have received your payment successfully.
                Your order is now being processed.</p> <h2>Order Details:</h2> <table> <thead> 
                <tr> <th>Order ID</th> <th>Gift Name</th> <th>Theme Name</th> <th>Price</th><th>Quantity
                </th></tr></thead><tbody>";

                foreach (var order in orders.OrderFields)
                {
                   body+=@"<tr><td>"+order.OrderId+"</td><td>"+order.GiftName+"</td><td>"+order.ThemeName+"</td><td>"+order.OrderPrice+"</td><td>"+order.OrderQuantity+"</td></tr>";
                }
                body+=@"</tbody></table> <p>If you have any questions or need further assistance, please 
                don't hesitate to contact our customer support team at joyfulgiversnameboardgift@gmail.com or +916127987777.We are always happy to help.</p> <p>Thank you once again for choosing Joyfulgivers. 
                We appreciate your business and look forward to serving you.</p><p>Best regards,<br> Joyfulgivers 
                <br>Customized Nameboard Team</p></body></html>";
            

                //Call to mail trigger function
                 emailService.SendEmail(recipientEmail, subject, body);

                return Ok(new { success = true, message = "Mail generated successfully", orders.OrderFields });
                }
            catch(Exception e){
                return BadRequest(new { success = false, message = e.Message });
            }
        }

        // PUT: api/editOrder/{OrderId}
        [HttpPut("user/editOrder/{orderId}")]
        public IActionResult Editorder(int orderId, [FromBody] OrdertoAdd order)
        {
            try
            {

                var theme = _context.Themes?.FirstOrDefault(t => t.ThemeId == order.ThemeId);
                var gift = _context.Gifts?.FirstOrDefault(g => g.GiftId == order.GiftId);
                var updateorder = _context.Orders?.FirstOrDefault(o => o.OrderId == orderId);

                if (updateorder == null)
                {
                    return BadRequest("Order ID not found");
                }

                if (theme == null || gift == null)
                {
                    return BadRequest("Invalid Theme or Gift ID");
                }
                if (order.OrderQuantity > gift.GiftQuantity)
                {
                    return NotFound("No gift stock available");
                }
                gift.GiftQuantity = gift.GiftQuantity - order.OrderQuantity;//Update gift quantity


                //Updating order
                updateorder.OrderName = order.OrderName;
                updateorder.OrderDescription = order.OrderDescription;
                updateorder.Theme = theme;
                updateorder.Gift = gift;
                updateorder.OrderDate = order.OrderDate;
                updateorder.OrderPrice = order.OrderPrice;
                updateorder.OrderAddress = order.OrderAddress;
                updateorder.OrderQuantity = order.OrderQuantity;
                updateorder.OrderPhone = order.OrderPhone;
                updateorder.OrderEmail = order.OrderEmail;

                _context.SaveChanges();
                return Ok(new { success = true, message = "Order edited", updateorder });

            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }
    
        [HttpDelete("user/deleteOrder/{OrderId}")]
        public IActionResult DeleteOrder(int OrderId)
        {
            try
            {
                var order = _context.Orders.FirstOrDefault(o => o.OrderId == OrderId);

                var changegiftquantity = _context.Orders
                    .Include(o => o.Theme)
                    .Include(o => o.Gift)
                    .FirstOrDefault(o => o.OrderId == OrderId);
                //Update gift quantity
                changegiftquantity.Gift.GiftQuantity += changegiftquantity.OrderQuantity;

                if (order == null)
                {
                    return NotFound("Order not found");
                }

                _context.Orders.Remove(order);
                _context.SaveChanges();
                return Ok(new { success = true, message = "Order deleted" });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }

    }
}