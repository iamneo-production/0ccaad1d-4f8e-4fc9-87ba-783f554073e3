using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace   dotnetapp.Models
{
    public class GiftModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GiftId { get; set; }
        public string GiftName { get; set; }
        public string GiftImageUrl { get; set; }
        public string GiftDetails { get; set; }
        public int GiftPrice { get; set; }
        public int GiftQuantity { get; set; }

        public GiftModel()
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