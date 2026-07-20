import React from "react";
import { Link } from "react-router-dom";

function NavBar({ items = [] }) {
  return (
    <ol>
      <Link to="/">Home</Link>
      {items.map((item, index) => (
        <li key={index}>
          <Link to={item.url}>{item.name}</Link>
        </li>
      ))}
    </ol>
  );
}

export default NavBar;
