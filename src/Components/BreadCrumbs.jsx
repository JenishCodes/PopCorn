import React from "react";
import { Link } from "react-router-dom";
import "../Styles/breadcrumbs.css";

function BreadCrumbs({ elements }) {
  return (
    <div className="breadcrumbs">
      <Link className='breadcrumbs-link' to="/">Home</Link>
      {elements.map((element) => (
        <span key={element}>
          <i className="fa fa-chevron-right breadcrumbs-arrow" />
          <span>{element}</span>
        </span>
      ))}
    </div>
  );
}

export default BreadCrumbs;
