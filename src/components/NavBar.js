import React from "react";
import { Link } from "react-router-dom";

function NavBar({ items = [] }) {
  return (
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      {items.map((item, index) => (
        <li key={index} className="breadcrumb-item">
          <Link to={item.url}>{item.name}</Link>
        </li>
      ))}
    </ol>
  );
}

export default NavBar;
