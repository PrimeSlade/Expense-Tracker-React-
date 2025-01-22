import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Body from "./Body";
import SignUp from "./SignUp";
import Login from "./Login";

function App() {
  // Main data
  const [acc, setAcc] = useState([
    {
      name: "Slade",
      password: 1234,
      amount: 100,
      data: {},
    },
  ]);

  const amount = acc[0].amount;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <div className="budget-container">
              <h1>My budget</h1>
              <h1>$ {amount}</h1>
            </div>
            <Body />
          </>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
