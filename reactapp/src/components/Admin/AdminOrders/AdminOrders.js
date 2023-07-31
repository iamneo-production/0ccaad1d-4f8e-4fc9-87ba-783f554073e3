import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuthenticationAdmin } from '../../Routing/routing'
import Preloader from '../AdminGifts/Preloader'
import AdminNavigation from '../AdminNavigation/AdminNavigation'
import Orders from './Orders'

const AdminOrders = () => {
  useAuthenticationAdmin()
  const [orders, setOrders] = useState([])
  // const orders = [
  //   {
  //     "orderId" : 12645,
  //     "userId" : 8768,
  //     "giftName" : "Wooden Board",
  //     "price" :"$300",
  //     "quantity" : 40
  //   },
  //   {
  //     "orderId" : 13445,
  //     "userId" : 4338,
  //     "giftName" : "Water Board",
  //     "price" :"$250",
  //     "quantity" : 50
  //   },
  //   {
  //     "orderId" : 16545,
  //     "userId" : 8535,
  //     "giftName" : "Brick Board",
  //     "price" :"$200",
  //     "quantity" : 30
  //   },
  // ]

  useEffect(()=>{
    axios.get("https://8080-dcfeffdefefcdbebafcdcbccfcecaabcfba.project.examly.io/admin/getAllOrders").then(response=>{
      setOrders(response.data.orders)
      console.log(
        response
      )
    }).catch(error=>console.log(error))
  },[])

  if(!orders){
    return <Preloader/> ;
  }

  return (
    <div>
      <AdminNavigation active = 'orders'   
      />
      <Orders orders ={orders}/>
    </div>
  )
}

export default AdminOrders
