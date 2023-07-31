using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
namespace dotnetapp.Models
{
   public class OrderModel
{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        public string OrderName { get; set; }
        public string OrderDescription { get; set; }

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime OrderDate { get; set; }

        public int OrderPrice { get; set; }
        public string OrderAddress { get; set; }
        public string OrderPhone { get; set; }
        public string OrderEmail { get; set; }
        public int OrderQuantity { get; set; }
        public ThemeModel? Theme { get; set; }
        public GiftModel? Gift { get; set; }
        public OrderModel()
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

        public int OrderPrice { get; set; }
        public string OrderAddress { get; set; }
        public string OrderPhone { get; set; }
        public string OrderEmail { get; set; }
        public int OrderQuantity { get; set; }
        public ThemeModel? Theme { get; set; }
        public GiftModel? Gift { get; set; }
        public OrderModel()
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