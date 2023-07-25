export const validateEmail = (email) => {
    if (!email) {
      return "Email should not be empty";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "Invalid email format";
    }
    return "";
  };
  export const validateUsername = (username) => {
    if (!username) {
      return "Username should not be empty";
    }
    const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
    if (!usernamePattern.test(username)) {
      return "Username must be at least 3 characters long and can only contain alphanumeric characters";
    }
    return "";
  };
  export const validateMobileNumber = (mobileNumber) => {
    if (!mobileNumber) {
      return "Mobile Number should not be empty";
    }
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumberPattern.test(mobileNumber)) {
      return "Invalid Mobile Number format";
    }
    return "";
  };
  