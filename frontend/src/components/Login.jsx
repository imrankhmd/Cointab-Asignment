import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
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

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://cointabbe.onrender.com/login",
        userData
      );
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful!");
      navigate("/home");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="Login">
      <h3>LOG IN</h3>

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

        <button type="submit" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
