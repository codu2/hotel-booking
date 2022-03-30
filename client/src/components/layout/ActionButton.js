import React from "react";
import { Link } from "react-router-dom";

import "./ActionButton.css";
import { AiFillCustomerService, AiFillCaretUp } from "react-icons/ai";

const ActionButton = () => {
  const handleScroll = (event) => {
    event.preventDefault();

    window.scrollTo(0, 0);
  };

  return (
    <div className="contact__button">
      <button>
        <Link to="/contacts">
          <AiFillCustomerService />
        </Link>
      </button>
      <button onClick={handleScroll}>
        <AiFillCaretUp />
      </button>
    </div>
  );
};

export default ActionButton;
