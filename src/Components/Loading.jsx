import React from "react";
import logo from "../Assets/Logo.png";
import "../Styles/loading.css";

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-img-container">
        <img src={logo} alt="PopCorn Icon" />
      </div>
    </div>
  );
}

export default Loading;
