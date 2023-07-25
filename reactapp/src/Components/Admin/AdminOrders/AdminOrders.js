import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthenticationAdmin } from "../../Routing/routing";
import Preloader from "../AdminGifts/Preloader";
import AdminNavigation from "../AdminNavigation/AdminNavigation";
import Orders from "./Orders";
const AdminOrders = () => {
  useAuthenticationAdmin();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5035/admin/getAllOrders")
      .then((response) => {
        setOrders(response.data.orders);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);
  if (!orders) {
    return <Preloader />;
  }
  return (
    <div>
      <AdminNavigation active="orders" />
      <Orders orders={orders} />
    </div>
  );
};
export default AdminOrders;
