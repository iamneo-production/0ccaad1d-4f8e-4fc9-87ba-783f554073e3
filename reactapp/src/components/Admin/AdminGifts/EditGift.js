import React, { useState } from 'react'
import { useAuthenticationAdmin } from '../../Routing/routing'
const EditGift = (props) => {
  useAuthenticationAdmin()
    const [url, setUrl]= useState(props.gift.giftImageUrl)
    const [id, setGiftId]= useState(props.gift.giftId)
    const [detail, setDetail]= useState(props.gift.giftDetails)
    const [name, setName]= useState(props.gift.giftName)
    const [price, setPrice]= useState(props.gift.giftPrice)
    const [quantity, setQuantity]= useState(props.gift.giftQuantity)
  const [danger, setDanger] = useState("")
    // const updateHandler = () =>{
    //     console.log("updated")
    // }
    const bool = 1
    const updateCondition = (bool) =>{
        props.changeComponent(bool)
    }
   
      const bodyStyles={
        backgroundColor:'#ffffff',
      };
  return (
    <div style={{padding:"10px"}} id="editGiftBody">
      <div className="container" style={{bodyStyles}}>
      <form onSubmit={(e)=>{
        e.preventDefault();
        // updateHandler();
        if( price === "" || quantity === "" || url === "" || detail ==="" || name === ""){
          setDanger("All fields must be required")
        }
        else if(Number (price)<0){
          setDanger("Price must be greater than zero")
        }
        else if(Number (quantity)<0){
          setDanger("Quantity must be greater than zero")
        }
        else{
          setDanger("")
        updateCondition(bool)
         // This is the body part
        const gift = {
          "id" : id,
          "name" : name,
          "url" : url,
          "price" : price,
          "quantity" : quantity,
          "details" : detail
        }
        props.onUpdateHandler(gift)
      }

      }}  className="editform">

      <h2>Edit Gift</h2>
      <p style={{'textAlign':'center', 'color':'red'}}>{danger}</p>
        <input type="text" placeholder='Enter the gift name' id="editGiftName"
            value={name}
            onChange ={(e)=>{
                setName(e.target.value)
            }}
            />
  
        
        <input type="text" placeholder='Enter the gift price' id="editGiftPrice"
             value={price}
            onChange ={(e)=>{
                setPrice(e.target.value)
            }}
            />
   
        
            <input type="text" placeholder='Enter the gift image url' id="editGiftImageUrl"
            value={url}
            onChange ={(e)=>{
                setUrl(e.target.value)
            }}
            />
  
            <input type="text" placeholder='Enter the product quantity' id="editGiftQuantity"
                 value={quantity}
            onChange ={(e)=>{
                setQuantity(e.target.value)
            }}
            />
   
            <textarea type="text" placeholder='Enter the gift details' id="editGiftDetails"
              value={detail}
            onChange ={(e)=>{
                setDetail(e.target.value)
            }}
            />
     
        
        <button type='submit' id="editGiftButton">UPDATE</button>
      </form>
      </div>
    </div>
  )
}

export default EditGift
