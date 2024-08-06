import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import "./style.css";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="header">
      <div>
        <Link to="/" className="logo">
          Learnly
        </Link>
      </div>
      <div className="middle">
        <Link to="/" className="header-links">
          Home
        </Link>
        <Link to="/classes" className="header-links">
          Classes
        </Link>
        <Link to="/enrolled" className="header-links">
          Enrolled Classes
        </Link>
      </div>
      <div className="auth-links">
        {token ? (
          <>
            <div onClick={handleLogout} className="header-link">
              <FaSignOutAlt className="header-icons" />
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="header-link">
              <FaSignInAlt className="header-icons" />
            </Link>
            <Link to="/signup" className="header-link">
              <FaUserPlus className="header-icons" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
