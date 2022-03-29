import React from "react";

import "./Recommend.css";
import { BiBed, BiBath } from "react-icons/bi";
import { RiParkingBoxLine } from "react-icons/ri";
import { MdOutlineRoomService } from "react-icons/md";

const Recommend = () => {
  return (
    <div className="recommend__container">
      <div className="recommend__wrapper">
        <div className="recommend__img">
          <img
            src={`https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80`}
            alt="recommend"
          />
        </div>
        <div className="recommend__desc">
          <div className="recommend__title">City View Hotel</div>
          <div className="recommend__paragraph">
            <p>Enjoy the city view from the high floors and wide windows.</p>
            <p>It has a neat interior, a spacious bathroom and a twin bed.</p>
            <p>
              Make happy memories with the sunset or the night view of the city!
            </p>
          </div>
          <ul className="recommend__info">
            <li>
              <span>
                <BiBed />
              </span>
              <span>Twin Bed 1</span>
            </li>
            <li>
              <span>
                <BiBath />
              </span>
              <span>Bathroom 1</span>
            </li>
            <li>
              <span>
                <RiParkingBoxLine />
              </span>
              <span>Parking 1</span>
            </li>
            <li>
              <span>
                <MdOutlineRoomService />
              </span>
              <span>Breakfast</span>
            </li>
          </ul>
          <button className="recommend__button">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
