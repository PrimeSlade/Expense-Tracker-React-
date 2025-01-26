import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Body from "./Body";
import SignUp from "./NavBar/SignUp";
import Login from "./NavBar/Login";

function App() {
  // Main data
  const [data, setData] = useState([
    { name: "Slade", password: "lolsai662", amount: 1000, data: [] },
  ]);

  //is login
  const [isLogin, setIsLogin] = useState(false);

  const [currAcc, setCurrAcc] = useState({});

  console.log(data);

  useEffect(() => {
    setIsLogin((s) => !s);
  }, [currAcc]);

  return (
    <Routes>
      {/* Main App */}
      <Route
        path="/"
        element={
          <>
            <NavBar currAcc={currAcc} setCurrAcc={setCurrAcc} />
            <div className="budget-container">
              <h1>My budget</h1>
              <h1>${currAcc.amount || 0}</h1>
            </div>
            <Body setData={setData} isLogin={isLogin} />
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
            setIsLogin={setIsLogin}
          />
        }
      />
    </Routes>
  );
}

export default App;
