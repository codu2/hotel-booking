import React from "react";

import "./Main.css";

const Main = () => {
  return (
    <div className="main__container">
      <div className="main__wrapper">
        <div className="main__img">
          <img src="/images/main.jpg" alt="홈페이지 메인 이미지" />
        </div>
        <div className="main__title">Book your stay</div>
        <div className="main__search">
          <div className="main__search-input">
            <label htmlFor="check_in">Check In</label>
            <input
              type="date"
              id="check_in"
              data-placeholder="Check-in date:"
              required
              aria-required="true"
            />
          </div>
          <div className="main__search-input">
            <label htmlFor="check_out">Check Out</label>
            <input
              type="date"
              id="check_in"
              data-placeholder="Check-out date:"
              required
              aria-required="true"
            />
          </div>
          <div className="main__search-input">
            <label htmlFor="adults">Adults</label>
            <input type="number" id="adults" placeholder="0" min="0" />
          </div>
          <div className="main__search-input">
            <label htmlFor="children">Children</label>
            <input type="number" id="children" placeholder="0" min="0" />
          </div>
        </div>
        <button className="main__search-button">Search</button>
      </div>
    </div>
  );
};

export default Main;
