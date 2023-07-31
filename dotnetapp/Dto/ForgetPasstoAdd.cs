using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Dto
{
    public class ForgetPasstoAdd
    {
        public string email {get; set;}
        public string Otp {get; set;}
        public ForgetPasstoAdd()
        {
            if(email==null)
            {
                email="";
            }
            if(Otp == null){
                Otp = "";
            }
        }
    }
}