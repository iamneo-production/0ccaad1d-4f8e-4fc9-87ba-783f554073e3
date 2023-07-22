using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ThemeModel
    {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ThemeId { get; set; }
    public string ThemeName { get; set; }
    public string ThemeDetails { get; set; }
    public int ThemePrice { get; set; }

    public ThemeModel()
    {
        if(ThemeName==null)
        {
            ThemeName="";
        }
        if(ThemeDetails==null)
        {
            ThemeDetails="";
        }
    }
    }
}