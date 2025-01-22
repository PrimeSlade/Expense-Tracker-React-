import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="main-container">
      <span className="container-acc">
        <Link to="/login">
          <button className="btn btn-login">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn btn-signup">Sign Up</button>
        </Link>
      </span>
    </div>
  );
}

export default NavBar;
