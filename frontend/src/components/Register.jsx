import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const Email = useRef(null);
  const Password = useRef(null);

  const [userData, setUserData] = useState({});

  const submitData = (e) => {
    e.preventDefault();

    const EmailE = Email.current.value;
    const PasswordE = Password.current.value;
    setUserData({ email: EmailE, password: PasswordE });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://cointabbe.onrender.com/register",
        userData
      );
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="Register">
      <h3>REGISTER</h3>

      <form onSubmit={submitData}>
        <label htmlFor="Email">Email</label>
        <br />
        <input
          type="email"
          id="Email"
          placeholder="Enter Your Email"
          ref={Email}
          onChange={submitData}
        />
        <br />

        <label htmlFor="Password">Password</label>
        <br />
        <input
          type="text"
          id="Password"
          placeholder="Enter Your Password"
          ref={Password}
          onChange={submitData}
        />
        <br />
        <br />

        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
