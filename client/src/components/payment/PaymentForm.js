import React, { useState } from "react";
import Cards from "react-credit-cards";

const PaymentForm = () => {
  const [card, setCard] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e) => {
    setCard({
      ...card,
      focus: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCard({
      [name]: value,
    });
  };

  return (
    <div id="PaymentForm">
      <Cards
        cvc={card.cvc}
        expiry={card.expiry}
        focused={card.focus}
        name={card.name}
        number={card.number}
      />
      <form>
        <input
          type="tel"
          name="number"
          placeholder="Card Number"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="expiry"
          placeholder="Valid Thru"
          pattern="\d\d/\d\d"
        />
        <input type="text" name="cvc" placeholder="CVC" pattern="\d{3,4}" />
      </form>
    </div>
  );
};

export default PaymentForm;
