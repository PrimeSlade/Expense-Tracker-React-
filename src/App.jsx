import "./App.css";
import React, { useEffect, useState, useContext, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Body from "./Body";
import SignUp from "./NavBar/SignUp";
import Login from "./NavBar/Login";
import DisplayAmount from "./Body/DisplayAmount";

export const CurrAccContext = createContext();

function App() {
  // Main data
  const [data, setData] = useState([
    { amount: 1000, name: "Slade", password: "lolsai662", tempData: [] },
  ]);

  //is login
  const [isLogin, setIsLogin] = useState(false);

  const [currAcc, setCurrAcc] = useState({});

  useEffect(() => {
    if (!currAcc.name) return;

    setData((d) => {
      const existingAcc = d.findIndex((acc) => acc.name === currAcc.name);

      if (existingAcc !== -1) {
        const updatedData = [...d];
        updatedData[existingAcc] = currAcc;
        return updatedData;
      }
    });
  }, [currAcc]);

  return (
    <CurrAccContext.Provider value={{ currAcc, setCurrAcc }}>
      <Routes>
        {/* Main App */}
        <Route
          path="/"
          element={
            <>
              <NavBar
                currAcc={currAcc}
                setCurrAcc={setCurrAcc}
                setIsLogin={setIsLogin}
              />
              <DisplayAmount currAcc={currAcc} setCurrAcc={setCurrAcc} />
              <Body
                setData={setData}
                isLogin={isLogin}
                setCurrAcc={setCurrAcc}
                currAcc={currAcc}
              />
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
    </CurrAccContext.Provider>
  );
}

export default App;
