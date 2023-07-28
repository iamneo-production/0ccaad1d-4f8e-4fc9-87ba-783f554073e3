import React, { useState, useEffect } from 'react';
import './PlaceOrder.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../UserHeader/Header';

const PlaceOrder = (props) => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [orderDate, setOrderDate] = useState(new Date());
  const [themes, setThemes] = useState(props.themes);
  const [themeId, setThemeId] = useState(null);
  const [themePrice, setThemePrice] = useState(null);
  const [themeValue, setThemeValue] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [price, setPrice] = useState(props.orders.giftPrice);
  const [giftName, setGiftName] = useState(props.orders.giftName);
  const [giftId, setGiftId] = useState(props.orders.giftId);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setEmail(localStorage.getItem('user'));
  }, []);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const handleMobileChange = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, '');
    if (phoneNumber.length <= 10) {
      setMobile(phoneNumber);
    }
  };

  const handlePlaceOrder = () => {
    if (
      themeValue !== '-1' &&
      themeValue !== null &&
      mobile.length === 10 &&
      address !== '' &&
      description !== '' &&
      name !== ''
    ) {
      const order = {
        orderName: name,
        orderDate: orderDate,
        orderAddress: address,
        orderEmail: email,
        orderPhone: mobile,
        orderPrice: price + themePrice,
        orderQuantity: quantity,
        orderDescription: description,
        orderThemeId: themeId,
        orderGiftId: giftId,
        orderGiftName: giftName,
        totalQuantity : props.orders.giftQuantity
      };

      if (localStorage.getItem('orders')) {
        const addOrders = localStorage.getItem('orders');
        const parseOrder = JSON.parse(addOrders);
        const finalOrders = [...parseOrder, order];
        localStorage.setItem('orders', JSON.stringify(finalOrders));
      } else {
        const orderList = [order];
        localStorage.setItem('orders', JSON.stringify(orderList));
      }

      window.location.href = '/user/cart';
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <Header />
      {showAlert && (
        <div className="alert-message">
          Please fill in all the required fields correctly.
          <button className="close-button" onClick={() => setShowAlert(false)}>
            X
          </button>
        </div>
      )}
      <div className="containers">
        <div className="left-column">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={`inputField ${name === '' && showAlert ? 'required-field' : ''}`}
            id="enterName"
          />
          <DatePicker
            className="inputField"
            selected={orderDate}
            onChange={(date) => setOrderDate(date)}
            placeholderText="Enter the Order Date"
            dateFormat="dd/MM/yyyy"
            id="enterDate"
            readOnly
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="address"
            placeholder="Enter your address"
            className={`inputField ${address === '' && showAlert ? 'required-field' : ''}`}
            id="enterAddress"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter your email id"
            className="inputField"
            id="enterEmailId"
            readOnly
          />
          <input
            type="tel"
            value={mobile}
            onChange={handleMobileChange}
            name="phoneNumber"
            placeholder="Enter your phone number"
            className={`inputField ${mobile.length !== 10 && showAlert ? 'required-field' : ''}`}
            id="enterPhoneNo"
            maxLength={10}
          />
          <img
            className="gift-image"
            src="https://media.istockphoto.com/id/1152848595/vector/isometric-gift-flat-icon-pixel-perfect-for-mobile-and-web.jpg?s=612x612&w=0&k=20&c=6_69uzGDhk5B1p9v8T_W_367qq0vUKypA1pkPoauk-U="
            alt="Gift"
          />
        </div>
        <div className="right-column">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            placeholder="Price"
            className="inputField"
            id="orderPrice"
            readOnly
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => 
              {
            
              if(e.target.value > props.orders.giftQuantity){
                alert("Avlailable Quantity is " + props.orders.giftQuantity)
              }
              else{
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
            }
            }
            placeholder="Quantity"
            min="1"
            max={props.orders.giftQuantity}
            className={`inputField ${quantity <= 0 && showAlert ? 'required-field' : ''}`}
          />
          <input
            type="text"
            value={giftName}
            onChange={(e) => setGiftName(e.target.value)}
            name="giftModel"
            placeholder="Gift Model"
            className="inputField"
            id="giftModel"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="orderDescription"
            placeholder="Order Description"
            className={`inputField ${description === '' && showAlert ? 'required-field' : ''}`}
            id="orderDescription"
            required
          />
          <select
            className={`inputField ${themeValue === '-1' && showAlert ? 'required-field' : ''}`}
            required
            name="themeModel"
            value={selectedTheme ? selectedTheme.themeName : ''}
            onChange={(e) => {
              const th = themes.find((theme) => theme.themeName === e.target.value);

              setThemeValue(e.target.value);
              if (th) {
                handleThemeSelect(th.themeName);
                setThemeId(th.themeId);
                setThemePrice(th.themePrice);
              } else {
                setSelectedTheme(null);
                setThemeId(null);
                setThemePrice(null);
              }
            }}
          >
            <option value="-1" id="selectThemeModel">
              Select the theme model
            </option>
            {themes.length === 0 ? <option>No themes found</option> : ''}
            {themes.map((theme) => (
              <option key={theme.themeName} value={theme.themeName} id="selectCategory">
                {theme.themeName} - ₹{theme.themePrice}
              </option>
            ))}
          </select>
          <div className="placeorder-button-container">
            <button className="placeorder-button" onClick={handlePlaceOrder} id="placeOrder">
              Place Order
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default PlaceOrder;