import "./App.css";
import Body from "./Body";
import NavBar from "./NavBar";
import React, { useState } from "react";
import SignUp from "./SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  //Main data
  const [acc, setAcc] = useState([
    {
      name: "Slade",
      password: 1234,
      amount: 100,
      data: {},
    },
  ]);

  return (
    <>
      <NavBar curAcc={acc} />
      <Body />
    </>
  );
}

export default App;
