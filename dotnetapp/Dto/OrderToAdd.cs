using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Dto
{
    public class OrdertoAdd
    {

        public string OrderName { get; set; }
        public string OrderDescription { get; set; }
        public int ThemeId { get; set; }
        public int GiftId { get; set; }

        [DataType(DataType.Date)]
        public DateTime OrderDate { get; set; }
        public int OrderPrice { get; set; }
        public string OrderAddress { get; set; }
        public string OrderPhone { get; set; }
        public string OrderEmail { get; set; }
        public int OrderQuantity { get; set; }
        public OrdertoAdd()
        {
            if (OrderEmail == null)
            {
                OrderEmail = "";
            }

            if (OrderDescription == null)
            {
                OrderDescription = "";
            }
            if (OrderAddress == null)
            {
                OrderAddress = "";
            }
            if (OrderPhone == null)
            {
                OrderPhone = "";
            }
            if (OrderName == null)
            {
                OrderName = "";
            }
        }
    }
}