using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Dto;
using dotnetapp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.DataBase;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("")]
    public class ThemeController : ControllerBase
    {
        private readonly DataDbContext _context;

        public ThemeController(DataDbContext context)
        {
            _context = context;
        }

        //Admin add theme
        [HttpPost("admin/addTheme")]
        public IActionResult AddTheme([FromBody] ThemetoAdd data)
        {
            try
            {
                var theme = new ThemeModel
                {
                    ThemeName = data.ThemeName,
                    ThemeDetails = data.ThemeDetails,
                    ThemePrice = data.ThemePrice
                };

                _context.Themes?.Add(theme);
                _context.SaveChanges();
                return Ok(new { success = true, message = "Theme added", theme });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }

        //User retrive get all themes
        [HttpGet("user/getAllThemes")]
        public IActionResult GetAllThemes()
        {
            try
            {
                if (_context.Themes?.ToList() == null)
                {
                    return NotFound("Theme not found");
                }
                var themes = _context.Themes.ToList();
                return Ok(new { success = true, message = "Retrieve list of themes", themes });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }

        //Admin retrive all themes
        [HttpGet("admin/getTheme")]
        public IActionResult ViewThemes()
        {
            try
            {
                if (_context.Themes?.ToList() == null)
                {
                    return NotFound("Theme not found");
                }
                var themes = _context.Themes.ToList();
                return Ok(new { success = true, message = "Retrieve all themes", themes });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }

        //User select a theme details
        [HttpGet("User/getTheme/{themeId}")]
        public IActionResult GetTheme(int themeId)
        {
            try
            {
                var theme = _context.Themes?.FirstOrDefault(t => t.ThemeId == themeId);

                if (theme == null)
                    return NotFound("Theme not found");

                return Ok(new { success = true, message = "Theme selected", theme });
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, message = e.Message });
            }
        }

        //Admin edit a theme details
        [HttpPut("editTheme/{themeId}")]
        public IActionResult EditTheme(int themeId, ThemeModel data)
        {
            var theme = _context.Themes?.FirstOrDefault(t => t.ThemeId == themeId);

            if (theme == null)
                return NotFound("Theme not found");

            theme.ThemeName = data.ThemeName;
            theme.ThemeDetails = data.ThemeDetails;
            theme.ThemePrice = data.ThemePrice;

            _context.SaveChanges();

            return Ok("Theme edited successfully");
        }

        //Admin delete a theme details
        [HttpDelete("deleteTheme/{themeId}")]
        public IActionResult DeleteTheme(int themeId)
        {
            var theme = _context.Themes?.FirstOrDefault(t => t.ThemeId == themeId);

            if (theme == null)
                return NotFound("Theme not found");

            _context.Themes?.Remove(theme);
            _context.SaveChanges();

            return Ok("Theme deleted successfully");
        }
    }
}