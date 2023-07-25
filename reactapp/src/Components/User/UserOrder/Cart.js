import React, { useState } from "react";
import "./Myorder.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import EditOrder from "./EditOrder";
import Header from "../UserHeader/Header";
import { useEffect } from "react";
import axios from "axios";
const Myorder = () => {
  const handlePayment = () => {
    var total = 0;
    for (var cartItem of cart) {
      total += cartItem.orderPrice;
    }
    const options = {
      key: "rzp_test_ATVJlAGIZSly7d", // Replace this with your actual test API key
      key_secret: "TTXQcyLIDWlxFEeAYcKNXHdE",
      amount: total * 100, // The amount is in paise (100 paise = 1 INR)
      currency: "INR",
      name: "GIFT SHOP",
      description: "CUSTOMIZED GIFT SHOP",
      handler: (response) => {
        console.log(response);
        if (response.razorpay_payment_id) {
          handlePay();
        } else {
          alert("First complete the payment to proceed the order");
        }
      },
      notes: {
        address: "Razorpay corporate office",
      },
      theme: {
        color: "#F37254",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };
  const [addOrEditorder, setAddOrEditorder] = useState(true);
  const [giftedit, setGiftEdit] = useState(null);
  const [cart, setCart] = useState(null);
  const [refCart, setRefCart] = useState(null);
  const [mailOrders, setMailOrders] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDelete = (id) => {
    const updatedData = cart.filter((item, index) => index !== id);
    setCart(updatedData);
    setIsDeleted(true);
  };
  const handleAfterDelete = () => {
    localStorage.setItem("orders", JSON.stringify(cart));
    console.log("After deletion");
  };
  useEffect(() => {
    if (isDeleted) {
      handleAfterDelete();
      setIsDeleted(false);
    }
  }, [isDeleted]);
  useEffect(() => {
    const cartItems = localStorage.getItem("orders");
    setCart(JSON.parse(cartItems));
    setRefCart(JSON.parse(cartItems));
    console.log(cartItems);
  }, []);

  function updateCartValue(index, newValue) {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const oldPrice = { ...refCart[index] };
      newCart[index] = {
        ...newCart[index],
        orderQuantity: newValue,
        orderPrice: Number(newValue) * Number(oldPrice.orderPrice),
      };
      console.log(newCart);
      return newCart; // Return the updated list
    });
  }
  if (!cart) {
    return <h1>Loading</h1>;
  }
  const handlePay = async () => {
    const mailingOrders = [];
    for (const cartItem of cart) {
      try {
        await axios
          .post("http://localhost:5035/user/addOrder", {
            orderName: cartItem.orderGiftName,
            orderDescription: cartItem.orderDescription,
            ThemeId: cartItem.orderThemeId,
            GiftId: cartItem.orderGiftId,
            orderDate: cartItem.orderDate,
            orderPrice: cartItem.orderPrice,
            orderAddress: cartItem.orderAddress,
            orderPhone: cartItem.orderPhone,
            orderEmail: cartItem.orderEmail,
            orderQuantity: cartItem.orderQuantity,
          })
          .then((response) => {
            const added = {
              orderId: response.data.newOrder.orderId,
              giftName: response.data.newOrder.gift.giftName,
              themeName: response.data.newOrder.theme.themeName,
              orderQuantity: response.data.newOrder.orderQuantity,
              orderPrice: response.data.newOrder.orderPrice,
            };
            console.log(added);
            mailingOrders.push(added);
            console.log(mailingOrders);
          });
      } catch (error) {
        console.log(error);
      }
    }
    const mail = await axios
      .post("http://localhost:5035/user/orderConfirmation", {
        mailId: localStorage.getItem("user"),
        orderFields: mailingOrders,
      })
      .then((response) => {
        window.location.href = "/user/myorder";
      });
    console.log(mail);
    const empty = [];
    localStorage.setItem("orders", JSON.stringify(empty));
  };
  const changeCondition = (bool) => {
    setAddOrEditorder(bool);
  };
  return (
    <>
      <Header active="cart" />
      <div className="header-gap" />
      {addOrEditorder ? (
        <div className="cart-container" id="giftOrderBody">
          <div className="column-names">
            <div className="column-name">
              <span>Gift Name</span>
            </div>
            <div className="column-name">
              <span>Price</span>
            </div>
            <div className="column-name">
              <span>Action</span>
            </div>
          </div>
          {cart.length === 0 ? (
            <p style={{ textAlign: "center", padding: "10px" }}>
              Your cart is empty.
            </p>
          ) : (
            <div className="cart-items">
              {cart.map((item, index) => (
                <div className="cart-item" key={index}>
                  <div className="cart-item-details" id="product{item.id}">
                    <div className="cart-item-column">{item.orderGiftName}</div>
                    <div className="cart-item-column">
                      ₹
                      {Number(refCart[index].orderPrice) *
                        Number(item.orderQuantity)}
                    </div>
                    <div
                      className="cart-item-column cart-action"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <input
                        style={{ width: "40px" }}
                        type="number"
                        value={item.orderQuantity}
                        onChange={(e) => {
                          updateCartValue(index, e.target.value);
                        }}
                      />
                      <span>Pcs</span>
                      <i
                        className="fas fa-trash-alt delete-icon"
                        onClick={() => {
                          handleDelete(index);
                          console.log(cart);
                        }}
                        id="deleteOrder"
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cart.length > 0 && (
            <div className="pay-button-container">
              <button
                className="pay-button"
                onClick={handlePayment}
                id="payButton"
              >
                Pay
              </button>
            </div>
          )}
        </div>
      ) : (
        <EditOrder giftedit={giftedit} changeCondition={changeCondition} />
      )}
    </>
  );
};
export default Myorder;
