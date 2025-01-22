import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Body from "./Body";
import SignUp from "./SignUp";
import Login from "./Login";

function App() {
  // Main data
  const [data, setData] = useState([]);

  //const amount = data[0].amount;

  return (
    <Routes>
      {/* Main App */}
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <div className="budget-container">
              <h1>My budget</h1>
              <h1>$0</h1>
            </div>
            <Body />
          </>
        }
      />
      {/* Route */}
      <Route
        path="/signup"
        element={<SignUp data={data} setData={setData} />}
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
