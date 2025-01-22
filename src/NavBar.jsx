import "./NavBar.css";
import React from "react";
import SignUp from "./SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function NavBar(prop) {
  // Amount
  const amount = prop.curAcc[0].amount;
  console.log(amount);

  return (
    <>
      <div className="main-container">
        <span className="container-acc">
          <button className="btn btn-login">Login</button>

          <button className="btn btn-signup">Sign Up</button>
        </span>

        <div className="budget-container">
          <h1>My budget</h1>
          <h1>$ {amount}</h1>
        </div>
      </div>
    </>
  );
}

export default NavBar;
