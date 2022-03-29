import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { AiFillHome } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbar__container">
      <Link to="/">
        <div className="navbar__logo">
          <span>
            <AiFillHome />
          </span>
          <span>HOUSNAP</span>
        </div>
      </Link>
      <ul className="navbar__menu">
        <li>
          <Link to="/rooms">Rooms</Link>
        </li>
        <li>News</li>
        <li>Contacts</li>
        <li>
          <button>Book Now</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
