import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { subDays, addDays } from "date-fns";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import "react-datepicker/dist/react-datepicker.css";
import "./RoomItem.css";
import { MdOutlinePeople, MdOutlineBed } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiReservedLine } from "react-icons/ri";
import { HiOutlineHashtag } from "react-icons/hi";
import { bookActions } from "../../store/book-slice";
import PaymentForm from "../payment/PaymentForm";

const RoomItem = ({ room, setBackdrop }) => {
  const dispatch = useDispatch();
  const booked = useSelector((state) => state.book.booked);
  const bookedInfo = useSelector((state) => state.book.bookedInfo);
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
  const [filterStartDate, setFilterStartDate] = useState([]);
  const [filterEndDate, setFilterEndDate] = useState([]);
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentType, setPaymentType] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchBooked = await axios.get("http://localhost:8080/booked");
        dispatch(bookActions.getBooked(fetchBooked.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (startDate && endDate) {
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
    }
  }, [endDate, startDate]);

  const handlePayment = async (type) => {
    setOpenDatePicker(false);
    setOpenPayment(true);

    setPaymentType(type);

    dispatch(
      bookActions.addBookedInfo({
        room: room.title,
        username: userInfo.username,
        phoneNumber: userInfo.phoneNumber,
        payment: payment,
        startDate: startDate.toString(),
        endDate: endDate.toString(),
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
        img: room.img,
      })
    );
  };

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

  useEffect(() => {
    if (openDatePicker === true) {
      let filterStartDate = [];
      let filterEndDate = [];
      const thisRoom = booked.filter((book) => book.room === room.title);
      if (thisRoom.length !== 0) {
        for (const key in thisRoom) {
          filterStartDate.push(new Date(thisRoom[key].startDate));
          filterEndDate.push(new Date(thisRoom[key].endDate));
        }
      } else {
        filterStartDate = [];
        filterEndDate = [];
      }
      setFilterStartDate(filterStartDate);
      setFilterEndDate(filterEndDate);
    }
  }, [openDatePicker]);

  const [excludeDates, setExcludeDates] = useState([]);
  const [onlyCheckout, setOnlyCheckout] = useState([]);
  const [maxDate, setMaxDate] = useState(false);
  const [maxDates, setMaxDates] = useState(null);
  const [maxDateNumber, setMaxDateNumber] = useState(0);

  useEffect(() => {
    if (openDatePicker === true) {
      if (filterStartDate && filterEndDate) {
        let dates = [];
        for (let i = 0; i < filterStartDate.length; i++) {
          const getTime =
            new Date(filterEndDate[i]).getTime() -
            new Date(filterStartDate[i]).getTime();

          let range = Math.abs(getTime / (1000 * 60 * 60 * 24));

          for (let j = 0; j < range + 1; j++) {
            dates.push(addDays(new Date(filterStartDate[i]), j));
          }
        }
        setExcludeDates(dates);
      }
    }
  }, [openDatePicker, filterStartDate, filterEndDate]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    let onlyCheckoutArray = [];
    for (let i = 0; i < filterStartDate.length; i++) {
      onlyCheckoutArray.push(
        new Date(
          filterStartDate[i].getFullYear(),
          filterStartDate[i].getMonth(),
          filterStartDate[i].getDate() - 1
        )
      );
    }
    setOnlyCheckout(onlyCheckoutArray);
  };

  useEffect(() => {
    if (onlyCheckout.length !== 0) {
      for (let i = 0; i < onlyCheckout.length; i++) {
        const clickStartDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        );
        const clickOnlyCheckout = onlyCheckout[i];

        const eveOnlyCheckout = new Date(
          onlyCheckout[i].getFullYear(),
          onlyCheckout[i].getMonth(),
          onlyCheckout[i].getDate() - 1
        );

        if (
          clickOnlyCheckout.toDateString() === clickStartDate.toDateString()
        ) {
          setMaxDate(true);
          break;
        } else if (
          eveOnlyCheckout.toDateString() === clickStartDate.toDateString()
        ) {
          setMaxDate(true);
          setMaxDateNumber(1);
          break;
        } else {
          setMaxDate(false);
          setMaxDateNumber(0);
        }
      }

      setMaxDates(
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
      );
    }
  }, [startDate, onlyCheckout]);

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
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
        <motion.button onClick={handleBooking}>
          <span>
            <RiReservedLine />
          </span>
          Book Now
        </motion.button>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {openDatePicker && !openPayment && (
            <motion.div
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="room__item-booking-form"
            >
              <div className="room__item-booking-info">
                <img src={room.img} alt={room.title} />
                <div className="room__item-booking-info-details">
                  <div className="room__item-booking-info_title">
                    {room.title}
                  </div>
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
              <div className="datepicker">
                <h1>select date : </h1>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  excludeDates={excludeDates}
                  minDate={subDays(new Date(), 0)}
                  maxDate={maxDate && addDays(maxDates, maxDateNumber)}
                  disabledKeyboardNavigation
                />
              </div>
              <div className="room__item-booking-datepicker">
                <div>
                  <span>Check-In</span>
                  <span>{startDate && startDate.toDateString()}</span>
                </div>
                <div>
                  <span>Check-Out</span>
                  <span>{endDate && endDate.toDateString()}</span>
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
                  If you exceed the number of people, you will be charged more
                  than $8.27 each.
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
                          (headcount.adults +
                            headcount.children -
                            room.info[0])) *
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
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      {openPayment && !openDatePicker && (
        <div className="room__item-payment-form">
          <PaymentForm
            setOpenDatePicker={setOpenDatePicker}
            setOpenPayment={setOpenPayment}
            type={paymentType}
            bookedInfo={bookedInfo}
          />
        </div>
      )}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {openDatePicker && !openPayment && (
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="room__item-booking-form"
          >
            <div className="room__item-booking-info">
              <img src={room.img} alt={room.title} />
              <div className="room__item-booking-info-details">
                <div className="room__item-booking-info_title">
                  {room.title}
                </div>
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
            <div className="datepicker">
              <h1>select date : </h1>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                excludeDates={excludeDates}
                minDate={subDays(new Date(), 0)}
                maxDate={maxDate && addDays(maxDates, maxDateNumber)}
                disabledKeyboardNavigation
              />
            </div>
            <div className="room__item-booking-datepicker">
              <div>
                <span>Check-In</span>
                <span>{startDate && startDate.toDateString()}</span>
              </div>
              <div>
                <span>Check-Out</span>
                <span>{endDate && endDate.toDateString()}</span>
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
                If you exceed the number of people, you will be charged more
                than $8.27 each.
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
                        (headcount.adults +
                          headcount.children -
                          room.info[0])) *
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomItem;

/*
  let sdt;
  let edt;

  if (openDatePicker) {
    if (filterStartDate) {
      sdt = new Date(
        filterStartDate.getFullYear(),
        filterStartDate.getMonth(),
        filterStartDate.getDate()
      );
    }

    if (filterEndDate) {
      edt = new Date(
        filterEndDate.getFullYear(),
        filterEndDate.getMonth(),
        filterEndDate.getDate()
      );
    }
  }

  const handleFilter = (date) => {
    if (filterStartDate && filterEndDate) {
      const filtersdt = getDate(sdt);
      const filteredt = getDate(edt);
      const filterDate = getDate(date);
      return filterDate !== filtersdt && filterDate !== filteredt;
    }
  };
  */
