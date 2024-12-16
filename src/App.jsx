import React from "react";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className=" p-5 h-dvh flex items-center justify-center">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
