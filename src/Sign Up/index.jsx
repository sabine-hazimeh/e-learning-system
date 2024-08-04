import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import image from "../images/studying.png";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        username,
        password,
        email,
        fullName,
      });
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img src={image} className="img"></img>
      </div>
      <form className="login-form" onSubmit={registerUser}>
        <p className="login-title">Sign Up</p>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name here...."
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username here...."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email here...."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password here...."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SignUp;
