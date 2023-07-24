import React, { useState } from 'react'
import "./AdminGiftsTable.css"
import {FaEdit,FaTrash} from "react-icons/fa"
import { useAuthenticationAdmin } from '../../Routing/routing'
const AdminGiftsTable = (props) => {
  useAuthenticationAdmin()
const [giftsTable, setGiftsTable] = useState(props.gifts)
console.log(giftsTable)
const deleteGift = (id) =>{
  const filteredGifts = giftsTable.filter((gift)=>gift.giftId!==id)
        setGiftsTable(filteredGifts)
  props.deleteGiftHandler(id)
}


const EditGiftHandler = (eGift) =>{
  const gift = {
    "giftId" : eGift.giftId,
    "giftImageUrl" : eGift.giftImageUrl,
    "giftName" : eGift.giftName,
    "giftPrice" : eGift.giftPrice,
    "giftQuantity" : eGift.giftQuantity,
    "giftDetails" : eGift.giftDetails
  }
props.EditGift(gift)
}
  return (
    <div className='giftsTable-wrapper'>
       <table>
        <thead>
        <tr>
        <th>Image</th>
        <th>Gift Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
        </thead>
        <tbody>
       
        {giftsTable.length===0 ?  <tr> <td colSpan={6} style={{'textAlign':'center'}}>No Gift found</td></tr> : (
        giftsTable.map((gift, index) =>{
       
          return(
          <tr key={gift.giftId}>
            <td><img className='gift-images' src={gift.giftImageUrl} alt='gift'/></td>
            <td>{gift.giftName}</td>
            <td>{gift.giftPrice}</td>
            <td className='gifts-quantity'>{gift.giftQuantity}</td><td><FaEdit onClick={()=>{
              EditGiftHandler(gift)
            }} id={`editGift${gift.giftId}`} /></td>
            <td><FaTrash onClick={()=>{
              deleteGift(gift.giftId)
            }} id={`deleteGift${gift.giftId}`}/></td>
        </tr>
        )
        })
       
       )}
        </tbody>
      </table>
    </div>
  )
}

export default AdminGiftsTable
