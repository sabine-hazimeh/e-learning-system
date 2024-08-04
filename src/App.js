import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Sign Up";
import Login from "./Login";
import Classes from "./Classes";
import Header from "./Header";
import Home from "./Home";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
