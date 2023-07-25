import React, { useState } from "react";
import "./PlaceOrder.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const EditOrder = (props) => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [orderDate, setOrderDate] = useState(null);
  const [name, setName] = useState(props.giftedit.name);
  const [price, setPrice] = useState(props.giftedit.price);
  const themes = [
    { name: "Leather war", price: 200 },
    { name: "Pattern", price: 100 },
    { name: "Face Pattern", price: 150 },
    { name: "Frame Design", price: 300 },
  ];
  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };
  const handlePlaceOrder = () => {
    props.changeCondition(1);
  };
  return (
    <>
      <div className="containers">
        <div className="left-column">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="inputField"
          />
          <DatePicker
            className="inputField"
            selected={orderDate}
            onChange={(date) => setOrderDate(date)}
            placeholderText="Enter the Order Date"
            dateFormat="dd/MM/yyyy"
          />
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            className="inputField"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email id"
            className="inputField"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            className="inputField"
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
            name="price"
            placeholder="Price"
            className="inputField"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            name="giftModel"
            placeholder="Gift Model"
            className="inputField"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            name="orderDescription"
            placeholder="Order Description"
            className="inputField"
          />
          <select
            className="inputField"
            name="themeModel"
            value={selectedTheme ? selectedTheme.name : ""}
            onChange={(e) =>
              handleThemeSelect(
                themes.find((theme) => theme.name === e.target.value)
              )
            }
          >
            <option value="">Select the theme model</option>
            {themes.map((theme) => (
              <option key={theme.name} value={theme.name}>
                {theme.name} - ₹{theme.price}
              </option>
            ))}
          </select>
          <div className="placeorder-button-container">
            <button
              className="placeorder-button"
              onClick={handlePlaceOrder}
              id="updateOrder"
            >
              Update Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditOrder;
