import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  loginFailure,
} from "../data-source/redux/UserSlice/slice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      console.log("API Response:", response.data); // Log the response to check its structure

      const { token, user } = response.data;

      console.log("User:", user); // Log the user object to see its value
      localStorage.setItem("authToken", token);

      dispatch(loginSuccess({ token, user }));

      navigate("/");
    } catch (error) {
      dispatch(loginFailure({ error: error.message }));
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <p className="login-title">Login</p>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username here...."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password here...."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
