import React, { useState, useEffect } from "react";
import axios from "axios";
const NewPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    const otpMail = localStorage.getItem("otpMail");
    if (otpMail) {
      setEmail(otpMail);
      localStorage.removeItem("otpMail");
    } else {
      window.location.href = "/";
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      axios
        .put("https://8080-dcbafaeadabbbccbebafcdcbccefeddcbcbaffb.project.examly.io/resetpassword", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            window.location.href = "/";
          }
        });
    } else {
      alert("passwords does not match");
    }
  };
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>
        New password:
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Confirm Password:
        <input
          type="text"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
      </label>

      <button type="submit" style={styles.button}>
        SUBMIT
      </button>
    </form>
  );
};
const styles = {
  form: {
    width: "300px",
    margin: "10% auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
export default NewPassword;
