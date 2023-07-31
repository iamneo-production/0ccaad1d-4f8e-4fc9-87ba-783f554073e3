import React, { useState } from "react";
import axios from "axios";
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpActive, setOtpActive] = useState(false);
  const [otpSend, setOtpSend] = useState("");
  const [otpReceived, setOtpReceived] = useState("");
  const generateOTP = () => {
    const digits = "123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    setOtpSend(otp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpActive) {
      const digits = "123456789";
      let otpRes = "";
      for (let i = 0; i < 6; i++) {
        otpRes += Math.floor(Math.random() * 10);
      }
      setOtpReceived(otpRes);
      console.log(email, otpRes);
      axios
        .post("https://8080-adfacebdabebafcdcbccfcecaabcfba.project.examly.io/GetOTP", { email: email, otp: otpRes })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setOtpActive(!otpActive);
          } else {
            alert("email not registered");
          }
        });
    } else {
      if (otp === otpReceived) {
        localStorage.setItem("otpMail", email);
        window.location.href = "/newpassword";
      } else {
        alert("incorrect otp");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>
        Email:
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </label>
      {otpActive && (
        <label style={styles.label}>
          OTP:
          <input
            type="text"
            value={otp}
            placeholder="OTP"
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />
        </label>
      )}
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
export default ForgotPasswordForm;
