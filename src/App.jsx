import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Body from "./Body";
import SignUp from "./SignUp";
import Login from "./Login";

function App() {
  // Main data
  const [data, setData] = useState([
    { name: "Slade", password: "lolsai662", amount: 1000, data: {} },
  ]);
  const [currAcc, setCurrAcc] = useState({});

  //const amount = data[0].amount;
  //console.log(data);
  console.log(currAcc.name);

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
              <h1>${currAcc.amount || 0}</h1>
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
      <Route
        path="/login"
        element={
          <Login
            data={data}
            setData={setData}
            currAcc={currAcc}
            setCurrAcc={setCurrAcc}
          />
        }
      />
    </Routes>
  );
}

export default App;
