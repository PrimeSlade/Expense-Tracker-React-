//frontend\src\NavBar\Login.jsx
import "./SignUp.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const Login = ({ data, setCurrAcc, setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const toggle = function () {
    setShowPassword((s) => !s);
  };

  const updateName = function (e) {
    setName(e.target.value);
  };

  const updatePassword = function (e) {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  // login func using async
  const login = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      // send login credentials to the backend using axios
      const response = await axios.post(
        "/login",
        { name, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //check if token and data are valid
      if (!response.data.token || !response.data.user) {
        throw new Error("Invalid server response");
      }

      const { token, user } = response.data;

      // Save the token to localStorage
      localStorage.setItem("token", token);
      setToken(token);
      // Update the current account state using the returned user data
      setCurrAcc(user);
      // boolean to true since we are logged in
      setIsLogin(true);

      // return to Home
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Username or Password is incorrect !!!");
    } finally {
      setLoading(false);
    }
  };

  //for enter key
  // window.addEventListener("keydown", function (e) {
  //   if (e.key === "Enter") {
  //     login();
  //   }
  // });

  return (
    <div className="Main-Box">
      <div className="btn-back-container">
        <Link to="/">
          <FontAwesomeIcon icon={faXmark} className="btn-back" />
        </Link>
      </div>

      <form className="container" onSubmit={login}>
        <div>Login an account</div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="eye"
            onClick={toggle}
          />
        </div>
        {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}
        <button type="submit" className="btn-create" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
