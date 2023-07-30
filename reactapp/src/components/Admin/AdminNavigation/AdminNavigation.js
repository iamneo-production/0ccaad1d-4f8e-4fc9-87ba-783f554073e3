import React from 'react'
import {Link} from "react-router-dom"
import { useAuthenticationAdmin } from '../../Routing/routing'
import "./AdminNavigation.css"
const AdminNavigation = ({active}) => {
  useAuthenticationAdmin()
  AdminNavigation.defaultProps ={
    active : 'gifts'
  }
  return (
    <div className='adminNavigation-wrapper'>
      <nav className='nav-bar'> 
      <div><p className='navigation-title'>Customized name board gift</p></div>
        <div>
            <ul className='links'>
                <li><Link to = "/admin/gifts" id="adminGifts" className={`${active === 'gifts' ? 'active' : ''}`}>Gifts</Link></li>
                <li><Link to = "/admin/themes" id="adminTheme" className={`${active === 'themes' ? 'active' : ''}`}>Themes</Link></li>
                <li><Link to = "/admin/orders" id="adminOrders" className={`${active === 'orders' ? 'active' : ''}`}>Orders</Link></li>
            </ul>
        </div>
        <div className='logout'>
            <Link to ="/" onClick={(e)=>{
              e.preventDefault();
              localStorage.setItem('authenticatedAdmin', false)
              window.location.href = "/"
            }} id="logout">Logout</Link>
        </div>
      </nav>
      
    </div>
  )
}

export default AdminNavigation
