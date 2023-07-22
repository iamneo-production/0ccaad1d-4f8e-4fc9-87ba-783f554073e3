import React, { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import backgroundImage from "../images/back1.jpg";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";
import { validateEmail, validateUsername, validateMobileNumber } from "./auth";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userRole, setUserRole] = useState("User");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };
  const handlePasswordValidation = (isValid) => {
    setPassword(isValid ? password : "");
  };
  const handleUserRoleChange = (e) => {
    setUserRole(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      username,
      mobileNumber,
      password,
      userRole, // Include the userRole in the request payload
    };
    const validationErrors = {
      email: validateEmail(email),
      username: validateUsername(username),
      mobileNumber: validateMobileNumber(mobileNumber),
    };
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (hasErrors) {
      return;
    }
    axios
      .post("http://localhost:8080/user/signup", userData)
      .then((response) => {
        if (response.status === 201) {
          navigate("/");
        } else {
          console.log(response);
          setErrorMessage("This email is already registered!");
        }
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data;
          setErrorMessage(errorMessage);
        } else {
          console.log("Error occurred during Registration:", error.message);
        }
      });
  };
  const signupStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: `url(${backgroundImage})`,
    backgroundSize: "100% 100vh",
  };
  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "300px",
    padding: "2rem",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };
  const inputStyles = {
    margin: "0.5rem",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  };
  const selectStyles = {
    margin: "0.5rem",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "110%",
  };
  const buttonStyles = {
    margin: "0.5rem",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  };
  const linkStyles = {
    color: "#000",
    fontWeight: "bold",
  };
  return (
    <div style={signupStyles}>
      <h1>Signup Page</h1>
      <form style={formStyles} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="admin/user">Enter user/admin:</label>
          <select
            id="admin/user"
            style={selectStyles}
            onChange={handleUserRoleChange}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <label htmlFor="Email">Enter email:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            style={inputStyles}
            autoComplete="off"
            required
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <label htmlFor="Username">Enter username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            onChange={handleUsernameChange}
            style={inputStyles}
            autoComplete="off"
            required
          />
          {errors.username && (
            <span style={{ color: "red" }}>{errors.username}</span>
          )}
        </div>
        <div>
          <label htmlFor="MobileNumber">Enter mobile number:</label>
          <input
            type="text"
            id="mobileNumber"
            placeholder="Enter mobile number"
            onChange={handleMobileNumberChange}
            style={inputStyles}
            autoComplete="off"
            required
          />
          {errors.mobileNumber && (
            <span style={{ color: "red" }}>{errors.mobileNumber}</span>
          )}
        </div>
        <div>
          <label htmlFor="Password">Enter password:</label>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Enter password"
            style={inputStyles}
            required
          />
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            valueAgain={confirmPassword}
            minLength={5}
            value={password}
            onChange={handlePasswordValidation}
          />
        </div>
        <div>
          <label htmlFor="ConfirmPassword">Confirm password:</label>
          <input
            type={passwordVisible ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            style={inputStyles}
            required
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="showPassword"
            checked={passwordVisible}
            onChange={() => setPasswordVisible(!passwordVisible)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <button id="submitButton" style={buttonStyles}>
          Submit
        </button>
        <Outlet />
      </form>
      <p>
        <span>Already a user?</span>{" "}
        <Link to="/" style={linkStyles}>
          Login
        </Link>
      </p>
    </div>
  );
};
export default Signup;
