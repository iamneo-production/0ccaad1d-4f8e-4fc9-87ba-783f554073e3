using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Dto
{
    public class OrderconfirmtoAdd
    {
        public string MailId {get; set;}
        public List<OrdercolumntoAdd> OrderFields{get; set;}
        public OrderconfirmtoAdd()
        {
            if(MailId==null){
                MailId="";
            }
            OrderFields=new List<OrdercolumntoAdd>();
        }
    }
}