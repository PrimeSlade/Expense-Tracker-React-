//frontend\src\NavBar.jsx
import "./NavBar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar({ currAcc, setCurrAcc, setIsLogin, footerRef }) {
  // currAcc is an object or die
  if (typeof currAcc !== "object" || currAcc === null) {
    currAcc = {};
  }
  const [isShow, setIsShow] = useState(false);

  //First Name
  const firstName = function (currAcc) {
    const Name = currAcc?.name?.split(" ");

    if (Name) {
      return Name[0][0].toUpperCase() + Name[0].slice(1).toLowerCase();
    }
  };

  const show = function () {
    setIsShow((s) => !s);
  };

  //Log out
  const logOut = function () {
    localStorage.removeItem("token");
    setCurrAcc({});
    setIsLogin(false);

    window.location.href = "/";
  };

  const scrollIntoFooter = function () {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="main-container">
      <span className="container-acc">
        <h2 className="welcome-text" onClick={scrollIntoFooter}>
          My GitHub
        </h2>

        {currAcc.name === undefined ? (
          <>
            <div>
              <Link to="/login">
                <button className="btn btn-login">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-sign-up">Sign Up</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="welcome-text" onClick={show}>
              Welcome {firstName(currAcc)}
            </h2>
          </>
        )}

        {isShow && (
          <button className="btn-log-out" onClick={logOut}>
            Log out
          </button>
        )}
      </span>
    </div>
  );
}

export default NavBar;
