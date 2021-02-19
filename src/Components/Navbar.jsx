import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import "../Styles/navbar.css";
import logo from "../Assets/Logo.png";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="site-header">
      <div className="navbar container">
        <Link className="brand-container" to="/">
          <img src={logo} alt="" className="site-logo" />
          <h1 className="site-title">PopCorn</h1>
        </Link>
        {currentUser && (
          <Link className="nav-menu-item" to={"/profile/" + currentUser.name}>
            {currentUser.name}
          </Link>
        )}
        {!currentUser && (
          <Link className="nav-menu-item" to="/signin">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
