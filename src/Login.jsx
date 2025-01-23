import "./SignUp.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = ({ data, setCurrAcc }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const toggle = function () {
    setShowPassword((s) => !s);
  };

  const updateName = function (e) {
    setName(e.target.value);
  };

  const updatePssword = function (e) {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const login = function () {
    //finding acc
    const currAcc = data.find(
      (acc) => acc.name === name && acc.password === password
    );

    if (!currAcc) {
      //Set error message
      setError("Username or Password is incorrect !!!");
    } else {
      setError("");

      //Set curr acc
      setCurrAcc(() => currAcc);

      //Reset input
      setName("");
      setPassword("");

      //Back to main page
      navigate("/");
    }
  };

  return (
    <>
      <div className="Main-Box">
        <div className="btn-back-container">
          <Link to="/">
            <FontAwesomeIcon icon={faXmark} className="btn-back" />
          </Link>
        </div>

        <div className="container">
          <div>Login an account</div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={updateName}
          />
          <br />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={updatePssword}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="eye"
              onClick={toggle}
            />
          </div>

          {/* Display Error */}
          <div
            className="error-message"
            style={{ color: "red", margin: "10px 0" }}
          >
            {error}
          </div>

          <button className="btn-create" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
