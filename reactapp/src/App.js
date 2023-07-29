import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminGifts from "./components/Admin/AdminGifts/AdminGifts";
import AdminOrders from "./components/Admin/AdminOrders/AdminOrders";
import AdminThemes from "./components/Admin/AdminThemes/AdminThemes";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/User/UserHome/Home";
import Myorder from "./components/User/UserOrder/Myorder";
import EditGift from "./components/Admin/AdminGifts/EditGift";
import EditTheme from "./components/Admin/AdminThemes/EditTheme";
import Cart from "./components/User/UserOrder/Cart";
import ForgotPasswordForm from "./components/Auth/ForgotPassword";
import NewPassword from "./components/Auth/NewPassword";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Login}></Route>
          <Route path="/signup" Component={Signup}></Route>
          <Route path="/admin" Component={AdminGifts}></Route>
          <Route path="/admin/editgift" Component={EditGift} />

          {/* Admin */}
          <Route path="/admin/gifts" Component={AdminGifts} />
          <Route path="/admin/themes" Component={AdminThemes} />
          <Route path="/admin/orders" Component={AdminOrders} />

          {/* User */}
          <Route path="/user/Home" Component={Home} />
          <Route path="/user/Myorder" Component={Myorder} />
          <Route path="/user/cart" Component={Cart} />
          <Route path="/forgotpassword" Component={ForgotPasswordForm} />
          <Route path="/newpassword" Component={NewPassword} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;