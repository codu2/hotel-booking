import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { subDays, addDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import "./RoomItem.css";
import { MdOutlinePeople, MdOutlineBed } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiReservedLine } from "react-icons/ri";
import { HiOutlineHashtag } from "react-icons/hi";

const Room = ({ room, setBackdrop }) => {
  const dispatch = useDispatch();
  const booked = useSelector((state) => state.booked);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1
    )
  );
  const [range, setRange] = useState(1);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [headcount, setHeadcount] = useState({
    adults: 0,
    children: 0,
  });
  const [payment, setPayment] = useState(1);
  const [userInfo, setUserInfo] = useState({
    username: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const start = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const end = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );
    const getTime = end.getTime() - start.getTime();
    const getRange = Math.abs(getTime / (1000 * 60 * 60 * 24));
    setRange(getRange);
  }, [endDate, startDate]);

  const handlePayment = (type) => {
    if (type === 0) {
      /*booking information confirm*/
    }

    if (type === 1) {
      /*connect credit card payment system*/
    }

    if (type === 2) {
      /*connect paypal payment system*/
    }

    dispatch({
      type: "booking",
      payload: [
        {
          room: room.title,
          username: userInfo.username,
          phoneNumber: userInfo.phoneNumber,
          payment: payment,
          startDate: startDate,
          endDate: endDate,
          headcount: headcount,
          price: Number(
            headcount.adults + headcount.children > room.info[0]
              ? (
                  (room.price +
                    8.27 *
                      (headcount.adults + headcount.children - room.info[0])) *
                  range
                ).toFixed(2)
              : (room.price * range).toFixed(2)
          ),
        },
      ],
    });
  };

  console.log(booked);

  const handleUserInfo = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleCount = (event) => {
    setHeadcount({
      ...headcount,
      [event.target.name]: Number(event.target.value),
    });
  };

  const handleBooking = (event) => {
    event.preventDefault();

    setBackdrop(true);
    setOpenDatePicker(true);
  };

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
        <button onClick={handleBooking}>
          <span>
            <RiReservedLine />
          </span>
          Book Now
        </button>
      </div>
      {openDatePicker && (
        <div className="room__item-booking-form">
          <div className="room__item-booking-info">
            <img src={room.img} alt={room.title} />
            <div className="room__item-booking-info-details">
              <div className="room__item-booking-info_title">{room.title}</div>
              <div className="room__item-booking-info_price">
                <span>1 night</span> {room.price}
              </div>
              <div>
                <div>
                  <MdOutlinePeople />
                  {room.info[0]}
                </div>
                <div>
                  <MdOutlineBed />
                  {room.info[1]}
                </div>
                <div>
                  <HiOutlineHashtag />
                  {room.info[2]}
                </div>
              </div>
            </div>
          </div>
          <div className="room__item-booking-datepicker">
            <div>
              <label htmlFor="check_in">Check-In</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setEndDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() + 1
                    )
                  );
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                id="check_in"
                showPopperArrow={false} //No Anchor Arrow
                minDate={subDays(new Date(), 0)} //Min Date
              />
            </div>
            <div>
              <label htmlFor="check_out">Check-Out</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                id="check_out"
                showPopperArrow={false}
                maxDate={addDays(new Date(), 30)} // Max Date
              />
            </div>
          </div>
          <div className="room__item-booking-more-details">
            <div className="room__item-booking-input">
              <label htmlFor="adults">Adults</label>
              <input
                onChange={handleCount}
                name="adults"
                type="number"
                id="adults"
                placeholder="0"
                min="0"
              />
            </div>
            <div className="room__item-booking-input">
              <label htmlFor="children">Children</label>
              <input
                onChange={handleCount}
                name="children"
                type="number"
                id="children"
                placeholder="0"
                min="0"
              />
            </div>
            <div className="room__item-booking-more-info">
              If you exceed the number of people, you will be charged more than
              $8.27 each.
            </div>
          </div>
          <h1>{`user : ${userInfo.username && userInfo.username}`}</h1>
          <div className="room__item-booking-user">
            <div className="room__item-booking-user-info">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="ex) John Doe"
                name="username"
                id="username"
                onChange={handleUserInfo}
              />
            </div>
            <div className="room__item-booking-user-info">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                placeholder="0123456789"
                name="phoneNumber"
                id="phoneNumber"
                onChange={handleUserInfo}
              />
            </div>
          </div>
          <h1>{`payment : $${
            headcount.adults + headcount.children > room.info[0]
              ? (
                  (room.price +
                    8.27 *
                      (headcount.adults + headcount.children - room.info[0])) *
                  range
                ).toFixed(2)
              : (room.price * range).toFixed(2)
          }`}</h1>
          <div className="room__item-booking-payments">
            <div
              className={`room__item-booking-payment ${
                payment === 0 && "active"
              }`}
              onClick={() => setPayment(0)}
            >
              cash
            </div>
            <div
              className={`room__item-booking-payment ${
                payment === 1 && "active"
              }`}
              onClick={() => setPayment(1)}
            >
              credit
            </div>
            <div
              className={`room__item-booking-payment ${
                payment === 2 && "active"
              }`}
              onClick={() => setPayment(2)}
            >
              paypal
            </div>
          </div>
          <div className="room__item-booking-actions">
            <button
              onClick={() => {
                setStartDate(new Date());
                setEndDate(
                  new Date(
                    startDate.getFullYear(),
                    startDate.getMonth(),
                    startDate.getDate() + 1
                  )
                );
                setPayment(1);
                setUserInfo({
                  username: "",
                  phoneNumber: "",
                });
                setBackdrop(false);
                setOpenDatePicker(false);
              }}
            >
              Cancel
            </button>
            <button onClick={() => handlePayment(payment)}>Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
