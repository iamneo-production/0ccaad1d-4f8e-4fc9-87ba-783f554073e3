import React from 'react';
import Header from '../UserHeader/Header';
import PlaceOrder from '../UserOrder/PlaceOrder';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuthenticationUser } from '../../Routing/routing';


// const products = [
//   { name: "Acrylic light", price: "₹ 500",image:"data:image/jpeg;base64,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" },
//   { name: "Acrylic wax", price: "₹ 900",image:"data:image/jpeg;base64,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" },
//   { name: "Wooden Board", price: "₹ 900",image:"data:image/jpeg;base64,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" },
//   { name: "Steel Printed", price: "₹ 200",image:"https://th.bing.com/th/id/OIP.BNqMpwsnqPq7PtgDh80wRwHaFh?w=281&h=209&c=7&r=0&o=5&pid=1.7" },
//   { name: "Wooden row", price: "₹ 200",image:"https://th.bing.com/th/id/OIP.AeNQH9cdyK6XIU-tWdOehgHaEH?w=326&h=181&c=7&r=0&o=5&pid=1.7"},
//   { name: "Acrylic Hard", price: "₹ 200",image:"https://th.bing.com/th/id/OIP.g_jRSZxKN0JPejd7oYh0qgAAAA?w=197&h=197&c=7&r=0&o=5&pid=1.7" },
//   { name: "Acrylic Smooth", price: "₹ 300",image:"data:image/jpeg;base64,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" },
// ];

const Home= () => {
  const [products, setProducts] = useState([])
  const [themes, setThemes] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null)
  useAuthenticationUser();
  const handleOrderDetails = (name, price, id, quantity) => {
    const orderDetail = {
        "giftName" : name,
        "giftPrice" : price,
        "giftId":id,
        "giftQuantity" : quantity
    }
    setOrderDetails(orderDetail)
  }
  useEffect(()=>{
    
    fetchGifts()
    fetchThemes()
  },[])
  const fetchThemes = async() =>{
    const response = await axios.get("https://8080-beacfbfacaabbdffbebafcdcbccefeddcbcbaffb.project.examly.io/user/getAllThemes")
    setThemes(response.data.themes)
    console.log(response)
  }
  const fetchGifts = async() =>{
    const response = await axios.get("https://8080-beacfbfacaabbdffbebafcdcbccefeddcbcbaffb.project.examly.io/admin/getGift")
    setProducts(response.data.gifts)
    console.log(response)
  }
  const [homeororder,setHomeorder]=useState(true)
  if(!products){
    return <h1>Loading</h1>
  }
  return (
    <>
    {
     homeororder?
    (<div>
    <Header active  = 'home'/>
    <div
      id="userHomeBody"
      style={{
        backgroundColor: '#f2f2f2',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      
              }}
    >
      <div
        style={{
          backgroundColor: 'grey',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        <div
          style={{
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              color: '#000',
              fontSize: '24px',
            }}
          >
            Welcome
          </h2>
          <h3 style={{'color':'white'}}>
          {products.length === 0 ? 'No products found' : ''}

          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '20px',
          }}
        >
        {products.length === 0 ? '' : (
          products.map((product, index) => (
            <button id={`grid${product.giftId}`} onClick={()=>
            {
              if(product.giftQuantity > 1){
                setHomeorder(false)
            handleOrderDetails(product.giftName, product.giftPrice, product.giftId, product.giftQuantity)
              }
              else{
                alert("No stocks available")
              }
            }}>
            <div
              key={product.giftId}
              style={{
                backgroundColor: '#f9f9f9',
                padding: '20px',
                borderRadius: '5px',
              }}
            >
              <div
                style={{
                  height: '200px',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  borderRadius: '5px',
                }}
              >
                {
                product.giftQuantity === 0 ? <p style={{color:'red'}}>out of stock</p> : ''
              }

                <img
                  src={product.giftImageUrl}
                  alt={product.giftName}
                  style={{ width: '100%', height: '100%'}}
                />
              </div>
              <h3
                style={{
                  color: '#000',
                  fontSize: '18px',
                  marginBottom: '10px',
                }}
              >
                {product.giftName}
              </h3>
              <p style={{ color: '#666' }}> Rs {product.giftPrice}</p>
            </div>
            </button>
          )))}
        </div>
      </div>
    </div>
    </div>):
    (<PlaceOrder themes = {themes} orders = {orderDetails}/>)}
    </>
  );
};

export default Home;
