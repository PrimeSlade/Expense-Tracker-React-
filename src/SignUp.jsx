import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";

function SignUp(prop) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");

  const [acc, setAcc] = useState({
    name: "Slade",
    password: 1234,
    amount: 100,
    data: {},
  });

  const setData = prop.setData;

  const updateData = function () {
    setData((s) => [...s, acc]);
  };

  console.log(prop.data);

  const toggle = function () {
    setShowPassword((s) => !s);
  };

  return (
    <>
      <div className="main-sign-up-container">
        <div>
          <div>Create an account</div>
          <input type="text" placeholder="Name" />
          <br />
          <input
            type={showPassword ? "password" : "text"}
            placeholder="Password"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="eye"
            onClick={toggle}
          />
          <br />
          <input type="text" placeholder="Amount" />
          <br />
          <button onClick={updateData}>Create</button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
