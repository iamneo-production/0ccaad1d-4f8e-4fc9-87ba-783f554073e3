import React, { useState } from 'react';
import './Myorder.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EditOrder from "./EditOrder";
import Header from '../UserHeader/Header';
import { useEffect } from 'react';
import axios from "axios";
import { format } from 'date-fns';

const Myorder = () => {
  const [addOrEditorder, setAddOrEditorder] = useState(true)
  const [giftedit,setGiftEdit]=useState(null)
  const [email, setEmail] = useState(null);

  const [cart, setCart] = useState([]);

  useEffect(()=>{
    const mail = localStorage.getItem('user')
    setEmail(mail)
    fetchOrders(mail)
  },[])
  const fetchOrders = (mail) =>{
    axios.get(`https://8080-beacfbfacaabbdffbebafcdcbccefeddcbcbaffb.project.examly.io/user/Myorders/${mail}`).then((response)=>setCart(response.data.order))
  }


 
  const changeCondition=(bool)=>{
    setAddOrEditorder(bool)
  }


  const handleDelete = (id) => {
    const updatedData =  cart.filter((item,index) => item.orderId!== id)
    setCart(updatedData)
    axios.delete(`https://8080-beacfbfacaabbdffbebafcdcbccefeddcbcbaffb.project.examly.io/user/deleteOrder/${id}`).then(response=>{
      console.log(response)
    })

    
   };
  return (
    <>
    <Header active = 'orders'/>
    <div className="header-gap"/>
    {
      addOrEditorder?(
      <div className="cart-container" id="giftOrderBody" >
        <div className="column-names">
        
          <div className="column-name">
            <span>Gift Name</span>
          </div>
          <div className="column-name">
            <span>Price</span>
          </div>
          <div className="column-name">
            <span>Quantity</span>
          </div>
          <div className="column-name">
            <span>Order Date</span>
          </div>
          <div className="column-name">
            <span></span>
          </div>
        </div>
        {cart.length === 0 ? (
          <p style = {{'textAlign':'center', 'padding':'10px'}}>No orders found.</p>

        ) : (
          <div className="cart-items">
            {cart.map((item,index) => (
              <div className="cart-item" key={item.orderId}>
                <div className="cart-item-details" id="product{item.id}" >
                  <div className="cart-item-column">{++index}.{item.orderName}</div>
                  <div className="cart-item-column">₹{item.orderPrice}</div>
                  <div className="cart-item-column">{item.orderQuantity}Ps</div>
                  <div className="cart-item-column">
                  {/* Use the format function to display only the date */}
                  {format(new Date(item.orderDate), 'dd-MM-yyyy')}
                </div>
                  <div className="cart-item-column">
                  <button
                  onClick={()=>{
                    handleDelete(item.orderId)
                  }}
                  style = {{backgroundColor:'red',padding:'6px',border:'none', color:'white', fontWeight:'bold',borderRadius:'10px'}}
                  >CANCEL</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
       
      </div>
      ):
      (<EditOrder giftedit={giftedit} changeCondition={changeCondition}/>)
     }
    </>
  );
};

export default Myorder;