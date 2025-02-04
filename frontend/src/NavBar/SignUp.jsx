//frontend\src\NavBar\SignUp.jsx
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp({ setData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");

  let acc = {
    name: name,
    password: password,
    amount: +amount,
  };

  const updateData = async function () {
    // Added checks for pass and amount btw since you forgot to add
    if (acc.name === "" || acc.password === "" || acc.amount === "")
      return alert(
        "Please ensure that all required fields are completed before proceeding !!!"
      );

    if (!isFinite(acc.amount)) return alert("Amount must be a number");

    if (acc.amount <= 0) return alert("Amount must be positive !!!");

    try {
      // We sending POST here to the server to create new user
      const response = await axios.post("http://localhost:5000/users", acc);

      //  Now we are setting it with response instead of acc directly
      // this will send the whole json to the database
      setData((s) => [...s, response.data]);

      alert("Your account has been successfully created");
      setName("");
      setPassword("");
      setAmount("");
    } catch (err) {
      alert("Error creating account: " + err.message);
    }
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
    <div className="Main-Box">
      <div className="btn-back-container">
        <Link to="/">
          <FontAwesomeIcon icon={faXmark} className="btn-back" />
        </Link>
      </div>

      <form className="container" onSubmit={updateData}>
        <div>Create an account</div>
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
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="btn-create">
          Create
        </button>
      </form>
    </div>
  );
}

export default SignUp;
