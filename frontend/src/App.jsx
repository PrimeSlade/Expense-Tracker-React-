// frontend\src\App.jsx
import "./App.css";
import React, { useEffect, useState, useRef, createContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Body from "./Body";
import SignUp from "./NavBar/SignUp";
import Login from "./NavBar/Login";
import DisplayAmount from "./Body/DisplayAmount";
import Footer from "./Footer";
import axios from "axios";

export const CurrAccContext = createContext();
// default url for axios requests
axios.defaults.baseURL = "http://localhost:5000";
function App() {
  const [currAcc, setCurrAcc] = useState({});
  // Main data
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("users")) || [{}]
  );

  // to manage token
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCurrAcc({}); // clean the acc state
        setIsLogin(false); // not logged in
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // get userdata from backend
        const response = await axios.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        //update with what we got
        setCurrAcc({
          _id: response.data._id,
          name: response.data.name,
          amount: response.data.amount || 0,
          expenses: response.data.expenses || [],
        });
        setIsLogin(true);
      } catch (error) {
        console.error("Profile fetch error:", error);
        localStorage.removeItem("token"); // refresh the token if fail to login
        setCurrAcc({});
        setIsLogin(false);
      }
    };

    fetchProfile();
  }, [token]);

  const footerRef = useRef(null);

  const reset = function () {
    localStorage.clear();
  };

  //is login
  const [isLogin, setIsLogin] = useState(false);

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
                footerRef={footerRef}
              />
              <DisplayAmount currAcc={currAcc} setCurrAcc={setCurrAcc} />
              <Body
                setData={setData}
                isLogin={isLogin}
                setCurrAcc={setCurrAcc}
                currAcc={currAcc}
              />
              <Footer footerRef={footerRef} />
            </>
          }
        />
        {/* Login Route */}
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
        {/* Signup Route */}
        <Route
          path="/signup"
          element={<SignUp data={data} setData={setData} />}
        />
      </Routes>
    </CurrAccContext.Provider>
  );
}

export default App;
