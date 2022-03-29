import React from "react";

import "./RoomItem.css";
import { MdOutlinePeople, MdOutlineBed } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiReservedLine } from "react-icons/ri";
import { HiOutlineHashtag } from "react-icons/hi";

const Room = ({ room }) => {
  return (
    <div className="room__item__container">
      <div className="room__item-img">
        <img src={room.img} alt={room.title} />
      </div>
      <div className="room__item-wrapper">
        <div className="room__item-title">{room.title}</div>
        <div className="room__item-price">{`$${room.price}`}</div>
        <div className="room__item-desc">{room.desc}</div>
        <ul className="room__item-info">
          <li>
            <span>
              <MdOutlinePeople />
            </span>
            <span>{room.info[0]}</span>
          </li>
          <li>
            <span>
              <MdOutlineBed />
            </span>
            <span>{room.info[1]}</span>
          </li>
          <li>
            <span>
              <HiOutlineHashtag />
            </span>
            <span>{room.info[2]}</span>
          </li>
        </ul>
      </div>
      <div className="room__item-booking">
        <button>
          <span>
            <AiOutlineShoppingCart />
          </span>
          <span>Cart</span>
        </button>
        <button>
          <span>
            <RiReservedLine />
          </span>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Room;
