import React, { useEffect, useState } from "react";
import "./Header.css";
import { useAuthenticationUser } from "../../Routing/routing";
const Header = (props) => {
  const [active, setActive] = useState("home");
  useAuthenticationUser();
  useEffect(() => {
    setActive(props.active);
  }, []);
  return (
    <header>
      <nav className="header-nav">
        <ul className="header-list">
          <li className="header-item home">
            <a
              href="/user/Home"
              id="giftHomeButton"
              className={`${active === "home" ? "active" : ""}`}
            >
              Home
            </a>
          </li>
          <li className="header-item small">
            <a
              href="/user/cart"
              id="myOrderButton"
              className={`${active === "cart" ? "active" : ""}`}
            >
              Cart
            </a>
          </li>
          <li className="header-item small">
            <a
              href="/user/myorder"
              id="myOrderButton"
              className={`${active === "orders" ? "active" : ""}`}
            >
              My orders
            </a>
          </li>
          <li className="header-item logout">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                localStorage.setItem("authenticatedUser", false);
                window.location.href = "/";
              }}
              id="logout"
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
