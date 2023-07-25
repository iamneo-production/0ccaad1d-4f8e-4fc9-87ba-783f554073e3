import React, { useState } from "react";
import { useAuthenticationAdmin } from "../../../Routing/routing";
import "./AddGift.css";
const AddGifts = (props) => {
  useAuthenticationAdmin();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");
  const addedGift = () => {
    const gift = {
      giftImageUrl: url,
      giftName: name,
      giftPrice: price,
      giftQuantity: quantity,
      giftDetails: details,
    };
    props.addNewGift(gift);
  };
  const formStyles = {
    width: "500px",
    padding: "50px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
  };
  return (
    <div className="admin-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addedGift();
        }}
        style={formStyles}
      >
        <div className="form-input">
          <h2>Add Gift</h2>
          <input
            type="text"
            id="enterGiftName"
            placeholder="Enter the gift name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            id="enterGiftPrice"
            placeholder="Enter the gift price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            placeholder="Enter the gift image url"
            id="giftImageUrl"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            id="enterGiftQuantity"
            placeholder="Enter the gift quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            id="enterGiftDetails"
            placeholder="Enter the gift details"
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
          />
        </div>
        <div className="form-input">
          <button type="submit" id="addGiftButton">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddGifts;
