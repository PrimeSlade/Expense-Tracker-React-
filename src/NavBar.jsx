import "./NavBar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavBar({ currAcc, setCurrAcc }) {
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
    setCurrAcc({});
    show();
  };

  return (
    <div className="main-container">
      <span className="container-acc">
        {currAcc.name === undefined ? (
          <>
            <Link to="/login">
              <button className="btn btn-login">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-sign-up">Sign Up</button>
            </Link>
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

NavBar.propTypes = {
  currAcc: PropTypes.object.isRequired,
  setCurrAcc: PropTypes.func.isRequired,
};

export default NavBar;
