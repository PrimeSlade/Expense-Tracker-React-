import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp({ setData }) {
  // Destructure prop here
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");

  let acc = {
    name: name,
    password: password,
    amount: +amount,
    tempData: [],
  };

  const updateData = function () {
    if (acc.name === "")
      return alert(
        "Please ensure that all required fields are completed before proceeding !!!"
      );
    if (!isFinite(acc.amount)) return alert("Amount must be a number");

    if (amount <= 0) return alert("Amount must be positve !!!");

    setData((s) => [...s, acc]);
    alert("Your account has been successfully created");
    setName("");
    setPassword("");
    setAmount("");
  };

  const toggle = function () {
    setShowPassword((s) => !s);
  };

  const updateName = function (e) {
    setName(e.target.value);
  };

  const updatePassword = function (e) {
    setPassword(e.target.value);
  };

  const updateAmount = function (e) {
    setAmount(e.target.value);
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
          <div>Create an account</div>
          <input
            type="text"
            placeholder="Name"
            onChange={updateName}
            value={name}
          />
          <br />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={updatePassword}
              value={password}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="eye"
              onClick={toggle}
            />
          </div>

          <input
            type="text"
            placeholder="Amount"
            onChange={updateAmount}
            value={amount}
          />
          <br />
          <button onClick={updateData} className="btn-create">
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
