import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();

    alert("Logged out!");
    navigate("/login");
  };

  const User = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="Home">
      <div className="showDataStyle">
        <p>{User ? User.email : "Not Available"}</p>

        <button type="" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
