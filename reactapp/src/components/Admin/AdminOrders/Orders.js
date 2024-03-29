import React from 'react'
import { useAuthenticationAdmin } from '../../Routing/routing'
import "./Orders.css"
import { format } from 'date-fns';
const Orders = (props) => {
  useAuthenticationAdmin()
  return (
    <div className='ordersTable-wrapper'>
      <table>
        <thead>
        <tr>
            <th>Order Id</th>
            <th>User Id</th>
            <th>Gift Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {props.orders.length === 0 ? <tr> <td colSpan={5} style={{'textAlign':'center'}}>No orders found</td></tr> : (
        props.orders.map((order)=>{
            return(
                <tr key = {order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.orderEmail}</td>
                    <td>{order.gift.giftName}</td>
                    <td>{order.orderPrice}</td>
                    <td>{order.orderQuantity}</td>
                    <td>{format(new Date(order.orderDate), 'dd-MM-yyyy')}</td>
                </tr>
            )
        })
        )}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
