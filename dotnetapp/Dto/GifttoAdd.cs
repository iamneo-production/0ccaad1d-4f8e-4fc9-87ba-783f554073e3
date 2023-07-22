using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Dto
{
    public class GifttoAdd
    {

        public string GiftName { get; set; }
        public string GiftImageUrl { get; set; }
        public string GiftDetails { get; set; }
        public int GiftPrice { get; set; }
        public int GiftQuantity { get; set; }

        public GifttoAdd()
        {
            if (GiftName == null)
            {
                GiftName = "";
            }
            if (GiftImageUrl == null)
            {
                GiftImageUrl = "";
            }
            if (GiftDetails == null)
            {
                GiftDetails = "";
            }
        }
    }
}