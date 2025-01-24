import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";

function NavBar({ currAcc }) {
  //First Name
  const firstName = function (currAcc) {
    const Name = currAcc?.name?.split(" ");
    if (Name) {
      return Name[0][0].toUpperCase() + Name[0].slice(1).toLowerCase();
    }
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
          <h2 className="welcome-text">Welcome {firstName(currAcc)}</h2>
        )}
      </span>
    </div>
  );
}

export default NavBar;
