using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Dto;
using dotnetapp.DataBase;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("")]
    public class GiftController : ControllerBase
    {
        private readonly DataDbContext _context;

        public GiftController(DataDbContext context)
        {
            _context = context;
        }

        //Admin Add gift
        [HttpPost("admin/addGift")]
        public IActionResult AddGift([FromBody] GifttoAdd data)
        {
            try
            {
                GiftModel gift = new GiftModel()
                {
                    GiftName = data.GiftName,
                    GiftImageUrl = data.GiftImageUrl,
                    GiftDetails = data.GiftDetails,
                    GiftPrice = data.GiftPrice,
                    GiftQuantity = data.GiftQuantity
                };

                _context.Gifts?.Add(gift);
                _context.SaveChanges();

                return Ok(new { success = true, message = "Gift added", gift });//200 status
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });//Error
            }
        }

        //Admin  retrieve list of theme details
        [HttpGet("admin/getGift")]
        public IActionResult ViewGift()
        {
            try
            {
                if (_context.Gifts?.ToList().Count == 0)
                {
                    return NotFound("Gifts not found");
                }
                var gifts = _context.Gifts?.ToList();
                return Ok(new { success = true, mesaage = "Retrive all the gift details", gifts });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }

        //user select a gift details
        [HttpGet("user/selectgift/{giftId}")]
        public IActionResult GetGift(int giftId)
        {
            try
            {
                var gift = _context.Gifts?.FirstOrDefault(g => g.GiftId == giftId);

                if (gift == null)
                    return NotFound("Gift not found");

                return Ok(new { success = true, message = "Gift selected", gift });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }

        //Admin edit a gift details
        [HttpPut("admin/editGift/{giftId}")]
        public IActionResult EditGift(int giftId, [FromBody] GifttoAdd data)
        {
            try
            {
                var gift = _context.Gifts?.FirstOrDefault(g => g.GiftId == giftId);

                if (gift == null)
                    return NotFound("Gift not found");

                gift.GiftName = data.GiftName;
                gift.GiftImageUrl = data.GiftImageUrl;
                gift.GiftDetails = data.GiftDetails;
                gift.GiftPrice = data.GiftPrice;
                gift.GiftQuantity = data.GiftQuantity;

                _context.SaveChanges();

                return Ok(new { success = true, message = "Gift edited", gift });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }

        //Admin delete a gift details
        [HttpDelete("admin/deleteGift/{giftId}")]
        public IActionResult DeleteGift(int giftId)
        {
            try
            {
                var gift = _context.Gifts?.FirstOrDefault(g => g.GiftId == giftId);

                if (gift == null)
                    return NotFound("Gift not found");

                _context.Gifts?.Remove(gift);//delete  from Gifts
                _context.SaveChanges();//Execute query
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
            return Ok(new { success = true, message = "Gift deleted" });
        }
    }
}