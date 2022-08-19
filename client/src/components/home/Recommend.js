import React, { useEffect, useState } from "react";

import "./Recommend.css";
import { BiBed, BiBath } from "react-icons/bi";
import { RiParkingBoxLine } from "react-icons/ri";
import { MdOutlineRoomService } from "react-icons/md";

const DUMMY_ROOMS = [
  {
    id: "r1",
    title: "ocean view hotel",
    img: "https://images.unsplash.com/photo-1501117716987-c8c394bb29df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    desc: "Enjoy swimming with the view of the ocean view.",
    info: [4, "Twin Bed 2", "Swimming Pool"],
    price: 246.23,
    paragraph: [
      "Enjoy swimming while looking at the emerald sea.",
      "In the morning, you can see the rising sun in the room.",
      "Make happy memories when you look at the ocean view through your balcony and wide window.",
    ],
  },
  {
    id: "r2",
    title: "city view hotel",
    img: "https://images.unsplash.com/photo-1620332372374-f108c53d2e03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80",
    desc: "You can relax in the middle of the city and have a party on the rooftop.",
    info: [2, "Bed 1", "Rooftop"],
    price: 140.59,
    paragraph: [
      "Enjoy the city view from the high floors and wide windows.",
      "It has a neat interior, a spacious bathroom and a twin bed.",
      "Make happy memories with the sunset or the night view of the city!",
    ],
  },
  {
    id: "r3",
    title: "mountain view hotel",
    img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80",
    desc: "Enjoy the night sky and scenery while looking at the endless mountains from your outdoor bed.",
    info: [4, "Bed 2", "Breakfast"],
    price: 310.33,
    paragraph: [
      "There's a special place that'll be remembered forever.",
      "Breakfast made with local specialties is provided free of charge",
      "Make happy memories with the night sky embroidered with starlight, a panoramic view, and endless mountains",
    ],
  },
];

const Recommend = ({ tab, setTab }) => {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    setRoom(DUMMY_ROOMS[tab]);
  }, [tab]);

  return (
    <div className="recommend__container">
      <div className="recommend__wrapper">
        <div className="recommend__img">
          <img src={room?.img} alt="recommend" />
        </div>
        <div className="recommend__desc">
          <div className="recommend__title">{room?.title}</div>
          <div className="recommend__paragraph">
            {room?.paragraph.map((par, index) => (
              <p key={index}>{par}</p>
            ))}
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
