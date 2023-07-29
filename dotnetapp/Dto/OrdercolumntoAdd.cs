using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Dto
{
    public class OrdercolumntoAdd
    {
        public int OrderId {get; set;}
        public string GiftName {get; set;}
        public string ThemeName {get; set;}
        public int OrderQuantity{get; set;}
        public int OrderPrice{get; set;}

        public OrdercolumntoAdd(){
            if(GiftName==null){
                GiftName="";
            }
            if(ThemeName==null){
                ThemeName="";
            }
        }
    }
    
}