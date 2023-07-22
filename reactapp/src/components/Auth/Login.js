import React, { useState } from 'react';
import backgroundImage from "../images/back.jpg";
import axios from 'axios';
//Login
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: `url(${backgroundImage})`,
    backgroundSize: "cover",
  };

  const formhandler = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    
    axios.post('http://localhost:5294/api/auth/login', { email, password })
      .then(response => {
        if (response.data.userRole === 'user') {
          // Redirect to user's home page
          window.location.href = "/user/Home";
        } else if (response.data.userRole === 'admin') {
          // Redirect to admin's home page
          window.location.href = "/admin/gifts";
        } else {
          // Handle invalid credentials
          setErrorMessage('Invalid username or password.');
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with an error status code
          const errorMessage = error.response.data;
          setErrorMessage(errorMessage);
          // Display the error message on the page
          // Update the state or show the error message using your preferred method
        } else {
          // The request was made but no response was received
          console.log('Error occurred during login:', error.message);
        }
      });
  };

  const handlesignup = (e) => {
    e.preventDefault();
    window.location.href = "/signup";
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

  return (
    <div style={loginStyles}>
      <h1 style={{ color: "HighlightText" }}>Login Page</h1>
      <form style={formStyles} onSubmit={formhandler}>
        <div>
          <label htmlFor="email">Enter email:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter email"
            style={inputStyles}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Enter password:</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Enter password"
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" style={buttonStyles} id="loginButton">
          Login
        </button>
      </form>
      <p>
        New user/admin? <br></br>
        <button id="signupLink" onClick={handlesignup} style={buttonStyles}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
