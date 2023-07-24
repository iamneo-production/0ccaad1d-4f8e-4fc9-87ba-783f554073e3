import React, { useState } from 'react';
import './PlaceOrder.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../UserHeader/Header';
import { useEffect } from 'react';
import axios from 'axios';

const PlaceOrder = (props) => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [orderDate, setOrderDate] = useState(new Date());
  const[themes, setThemes] = useState(props.themes)
  const [themeId, setThemeId] = useState(null)
  const [themePrice, setThemePrice] = useState(null)
  const [ themeValue, setThemeValue] = useState(null)


  const [name, setName] = useState(null)
  const [address, setAddress] = useState(null)
  const [email, setEmail] = useState(null)
  const [mobile, setMobile] = useState(null)
  const [price, setPrice] = useState(props.orders.giftPrice)
  const [giftName, setGiftName] = useState(props.orders.giftName)
  const [giftId, setGiftId] = useState(props.orders.giftId)
  const [description, setDescription] = useState(null)
  const [quantity, setQuantity] = useState(1)
  console.log(props)
  useEffect(()=>{
    setEmail(localStorage.getItem('user'))
  },[])

  // const themes = [
  //   { name: 'Leather war', price: 200 },
  //   { name: 'Pattern', price: 100 },
  //   { name: 'Face Pattern', price: 150 },
  //   { name: 'Frame Design', price: 300 },
  //   // Add more themes as needed
  // ];

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const handlePlaceOrder = () => {
    // selectedTheme !== '' && selectedTheme !== null
    if( themeValue !== '-1' && themeValue !== null && mobile!== null && address !== null && description!==null){

    const order = {
      "orderName" : name,
      "orderDate" : orderDate,
      "orderAddress" : address,
      "orderEmail" : email,
      "orderPhone" : mobile,
      "orderPrice" : price + themePrice,
      "orderQuantity" : quantity,
      "orderDescription": description,
      "orderThemeId" : themeId,
      "orderGiftId" : giftId,
      "orderGiftName" : giftName

    }

    if( localStorage.getItem('orders')){
      var addOrders = localStorage.getItem('orders');
      var parseOrder = JSON.parse(addOrders);
      console.log(parseOrder)
      const finalOrders = [...parseOrder ,order]
    localStorage.setItem('orders', JSON.stringify(finalOrders))
    console.log(finalOrders)
    }
    else{
    var orderList = [order]
    localStorage.setItem('orders', JSON.stringify(orderList))
    }
    
      window.location.href="/user/cart"
    // Logic to handle placing the order
    // You can access the form data here and perform the necessary actions
  }
else{
  alert("select all field")
}
  };



  return (
    <>
    <Header/>
    <div className="containers">
      <div className="left-column">
        <input type="text" name="name" 
        value = {name}
        onChange = {(e)=>setName(e.target.value)}
         placeholder="Enter your name" className="inputField" id="enterName" />
        <DatePicker className="inputField"
            selected={orderDate}
            onChange={(date) => setOrderDate(date)}
            placeholderText="Enter the Order Date"
            dateFormat="dd/MM/yyyy"
            id="enterDate"
        />
        <input type="text" 
            value = {address}
        onChange = {(e)=>setAddress(e.target.value)}
        name="address" placeholder="Enter your address" className="inputField" id="enterAddress" />
        <input type="email" 
            value = {email}
        onChange = {(e)=>setEmail(e.target.value)}
         name="email" placeholder="Enter your email id" className="inputField" id="enterEmailId" readOnly />
        <input type="tel" 
            value = {mobile}
        onChange = {(e)=>setMobile(e.target.value)}
        name="phoneNumber" placeholder="Enter your phone number" className="inputField" id="enterPhoneNo" />
        <img className="gift-image" src="https://media.istockphoto.com/id/1152848595/vector/isometric-gift-flat-icon-pixel-perfect-for-mobile-and-web.jpg?s=612x612&w=0&k=20&c=6_69uzGDhk5B1p9v8T_W_367qq0vUKypA1pkPoauk-U=" alt="Gift" />
      </div>
      <div className="right-column">
        <input type="number" 
            value = {price}
        onChange = {(e)=>setPrice(e.target.value)}
         name="price" placeholder="Price" className="inputField" id="orderPrice" readOnly/>
         <input type = 'number' 
          value = {quantity}
        onChange = {(e)=>setQuantity(e.target.value)}
         placeholder='quantity' min= '1' className='inputField'/>
        <input type="text"
            value = {giftName}
        onChange = {(e)=>setGiftName(e.target.value)}
        
         name="giftModel" placeholder="Gift Model" className="inputField" id="giftModel" />
        <textarea 
            value = {description}
        onChange = {(e)=>setDescription(e.target.value)}
         name="orderDescription" placeholder="Order Description" className="inputField" id="orderDescription" required />
          <select className="inputField" required
            name="themeModel"
            value={selectedTheme ? selectedTheme.themeName : ''}
            onChange={(e) => {const th = themes.find((theme) => theme.themeName === e.target.value)

            setThemeValue(e.target.value)
              if(th){

                  handleThemeSelect(th.themeName)
                  setThemeId(th.themeId)
                  setThemePrice(th.themePrice)
              }
              else{

              }

            }}
          >
            <option value="-1" id="selectThemeModel" >Select the theme model</option>
            {themes.length === 0 ? <option>No themes found</option> : ''}
            {themes.map((theme) => (
              <option key={theme.themeName} value={theme.themeName} id="selectCategory" >
                {theme.themeName} - ₹{theme.themePrice}
              </option>
            ))}
          </select>
        <div  className="placeorder-button-container">
          <button className="placeorder-button" onClick={handlePlaceOrder} id="placeOrder" >Place Order</button>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default PlaceOrder;
