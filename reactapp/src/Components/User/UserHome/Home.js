import React from "react";
import Header from "../UserHeader/Header";
import PlaceOrder from "../UserOrder/PlaceOrder";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuthenticationUser } from "../../Routing/routing";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [themes, setThemes] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const handleOrderDetails = (name, price, id) => {
    const orderDetail = {
      giftName: name,
      giftPrice: price,
      giftId: id,
    };
    setOrderDetails(orderDetail);
  };
  useEffect(() => {
    fetchGifts();
    fetchThemes();
  }, []);
  const fetchThemes = async () => {
    const response = await axios.get("http://localhost:5035/user/getAllThemes");
    setThemes(response.data.themes);
    console.log(response);
  };
  const fetchGifts = async () => {
    const response = await axios.get("http://localhost:5035/admin/getGift");
    setProducts(response.data.gifts);
    console.log(response);
  };
  const [homeororder, setHomeorder] = useState(true);
  if (!products) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      {homeororder ? (
        <div>
          <Header active="home" />
          <div
            id="userHomeBody"
            style={{
              backgroundColor: "#f2f2f2",
              padding: "20px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div
              style={{
                backgroundColor: "grey",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    color: "#000",
                    fontSize: "24px",
                  }}
                >
                  Welcome
                </h2>
                <h3 style={{ color: "white" }}>
                  {products.length === 0 ? "No products found" : ""}
                </h3>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridGap: "20px",
                }}
              >
                {products.length === 0
                  ? ""
                  : products.map((product, index) => (
                      <button
                        id={`grid${product.giftId}`}
                        onClick={() => {
                          setHomeorder(false);
                          handleOrderDetails(
                            product.giftName,
                            product.giftPrice,
                            product.giftId
                          );
                        }}
                      >
                        <div
                          key={product.giftId}
                          style={{
                            backgroundColor: "#f9f9f9",
                            padding: "20px",
                            borderRadius: "5px",
                          }}
                        >
                          <div
                            style={{
                              height: "200px",
                              marginBottom: "10px",
                              overflow: "hidden",
                              borderRadius: "5px",
                            }}
                          >
                            <img
                              src={product.giftImageUrl}
                              alt={product.giftName}
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                          <h3
                            style={{
                              color: "#000",
                              fontSize: "18px",
                              marginBottom: "10px",
                            }}
                          >
                            {product.giftName}
                          </h3>
                          <p style={{ color: "#666" }}>
                            {" "}
                            Rs {product.giftPrice}
                          </p>
                        </div>
                      </button>
                    ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PlaceOrder themes={themes} orders={orderDetails} />
      )}
    </>
  );
};
export default Home;
