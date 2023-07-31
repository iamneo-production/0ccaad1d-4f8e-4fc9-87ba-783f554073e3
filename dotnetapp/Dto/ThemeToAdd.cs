using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Dto
{
    public class ThemetoAdd
    {
        public string ThemeName { get; set; }
        public string ThemeDetails { get; set; }
        public int ThemePrice { get; set; }

        public ThemetoAdd()
        {
            if (ThemeName == null)
            {
                ThemeName = "";
            }
            if (ThemeDetails == null)
            {
                ThemeDetails = "";
            }
        }
    }
}