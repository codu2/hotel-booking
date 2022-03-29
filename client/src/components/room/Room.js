import React, { useState } from "react";

import "./Room.css";
import RoomItem from "./RoomItem";

//people, bed, service
const DUMMY_ROOMS = [
  {
    id: "r1",
    title: "ocean view hotel",
    img: "https://images.unsplash.com/photo-1501117716987-c8c394bb29df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    desc: "Enjoy swimming with the view of the ocean view.",
    info: [4, "Twin Bed 2", "Swimming Pool"],
    price: 346.23,
  },
  {
    id: "r2",
    title: "city view hotel",
    img: "https://images.unsplash.com/photo-1620332372374-f108c53d2e03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80",
    desc: "You can relax in the middle of the city and have a party on the rooftop.",
    info: [2, "Bed 1", "Rooftop"],
    price: 204.69,
  },
  {
    id: "r3",
    title: "mountain view hotel",
    img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80",
    desc: "Enjoy the night sky and scenery while looking at the endless mountains from your outdoor bed.",
    info: [`2~4`, "Bed 2", "Breakfast"],
    price: 300.33,
  },
  {
    id: "r4",
    title: "river view hotel",
    img: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    desc: "The room is located in front of the river, where you can experience the ferry cruise in a package as well as the River View.",
    info: [2, "Bed 1", "River Ferry Cruise"],
    price: 326.23,
  },
  {
    id: "r5",
    title: "juniper room",
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    desc: "Located in California, you can enjoy the beautiful view of Joshua Tree National Park.",
    info: [`4~5`, "Bed 1", "Joshua Tree"],
    price: 489.62,
  },
  {
    id: "r6",
    title: "mountain view hotel",
    img: "https://images.unsplash.com/photo-1514580597161-eb1c0b1a7971?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    desc: "It is a small apartment on Lu la Fayette Street in downtown Paris, where you can see the Eiffel Tower and enjoy a beautiful view of downtown Paris.",
    info: [2, "Twin Bed 1", "A Panoramic View of Paris"],
    price: 172.12,
  },
];

const Rooms = () => {
  const [backdrop, setBackdrop] = useState(false);

  return (
    <div className="room__container">
      <div className="room__wrapper">
        <h1>Our Rooms</h1>
        <div className="room__search">
          <div className="room__search-input">
            <label htmlFor="check_in">Check In</label>
            <input
              type="date"
              id="check_in"
              data-placeholder="Check-in date:"
              required
              aria-required="true"
            />
          </div>
          <div className="room__search-input">
            <label htmlFor="check_out">Check Out</label>
            <input
              type="date"
              id="check_in"
              data-placeholder="Check-out date:"
              required
              aria-required="true"
            />
          </div>
          <div className="room__search-input">
            <label htmlFor="adults">Adults</label>
            <input type="number" id="adults" placeholder="0" min="0" />
          </div>
          <div className="room__search-input">
            <label htmlFor="children">Children</label>
            <input type="number" id="children" placeholder="0" min="0" />
          </div>
          <button className="room__search-button">Search</button>
        </div>
        <div className="room">
          {DUMMY_ROOMS.map((room) => (
            <RoomItem key={room.id} room={room} setBackdrop={setBackdrop} />
          ))}
        </div>
      </div>
      {backdrop && <div className="room__item-booking-backdrop" />}
    </div>
  );
};

export default Rooms;
