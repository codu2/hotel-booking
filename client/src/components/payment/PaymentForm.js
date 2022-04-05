import React, { useState } from "react";
import Cards from "react-credit-cards";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./PaymentForm.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

import "react-credit-cards/es/styles-compiled.css";

const PaymentForm = ({ setOpenDatePicker, setOpenPayment, bookedInfo }) => {
  const navigate = useNavigate();
  const [credit, setCredit] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
  });

  const { name, number, expiry, cvc, focused, issuer } = credit;

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setCredit({ issuer });
    }
  };

  const handleInputFocus = (e) => {
    setCredit({
      ...credit,
      focused: e.target.name,
    });
  };

  const handleInputChange = (e) => {
    if (e.target.name === "number") {
      e.target.value = formatCreditCardNumber(e.target.value);
    } else if (e.target.name === "expiry") {
      e.target.value = formatExpirationDate(e.target.value);
    } else if (e.target.name === "cvc") {
      e.target.value = formatCVC(e.target.value);
    }

    setCredit({ ...credit, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/booked", {
      room: bookedInfo.room,
      username: bookedInfo.username,
      phoneNumber: bookedInfo.phoneNumber,
      payment: {
        name: credit.name,
        number: credit.number,
        expiry: credit.expiry,
        cvc: credit.cvc,
      },
      startDate: bookedInfo.startDate,
      endDate: bookedInfo.endDate,
      headcount: bookedInfo.headcount,
      price: bookedInfo.price,
      img: bookedInfo.img,
    });

    setCredit({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      issuer: "",
      focused: "",
    });

    setOpenPayment(false);
    navigate("/");
  };

  return (
    <div key="Payment">
      <div className="App-payment">
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={handleCallback}
        />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <p>E.g.: 49..., 51..., 36..., 37...</p>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              autoComplete="off"
            />
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <input type="hidden" name="issuer" value={issuer} />
          <div className="form-actions">
            <button
              className="form-prev-button"
              onClick={() => {
                setOpenDatePicker(true);
                setOpenPayment(false);
              }}
            >
              Prev
            </button>
            <button className="form-button">Pay</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
