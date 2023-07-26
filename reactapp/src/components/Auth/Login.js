import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import backgroundImage from "../images/back.jpg";
import axios from 'axios';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
console.log(email, password)
    axios.post('https://8080-fecfcfddebecabebafcdcbccefeddcbcbaffb.project.examly.io/login', { "email" : email
    , "password": password })

      .then(response => {
        console.log(response)
        console.log(response.data)
        if (response.data.userRole === "admin") {
          localStorage.setItem('admin',response.data.email);
          localStorage.setItem('authenticatedUser', false);
          localStorage.setItem('authenticatedAdmin', true);
        } else {
          localStorage.setItem('user',response.data.email);
          localStorage.setItem('authenticatedUser', true);
          localStorage.setItem('authenticatedAdmin', false);
        }
        if (response.data.userRole === 'user') {
          navigate('/user/Home');
        } else if (response.data.userRole === 'admin') {
          navigate('/admin/gifts');
        } else {
          setErrorMessage('Invalid username or password.');
        }
      })
      .catch(error => {
        if (error.response) {
          const errorMessage = error.response.data;
          setErrorMessage(errorMessage);
        } else {
          console.log('Error occurred during login:', error.message);
        }
      });
  };

  const handlesignup = (e) => {
    e.preventDefault();
    navigate('/signup');
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
            autoComplete='off'
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
        <p>or</p>
        <p style={{'cursor':'pointer'}}
        onClick={()=>{
          window.location.href = '/forgotpassword';
        }} 
        >Forgot password</p>
        < Outlet/>
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