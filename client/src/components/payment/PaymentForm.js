import React from "react";
import Cards from "react-credit-cards";
import axios from "axios";
import { connect } from "react-redux";

import "./PaymentForm.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

import "react-credit-cards/es/styles-compiled.css";

class PaymentForm extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async (e, bookedInfo) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();

    await axios.post("http://localhost:8080/booked", {
      room: bookedInfo.title,
      username: bookedInfo.username,
      phoneNumber: bookedInfo.phoneNumber,
      payment: {
        name: this.name,
        number: this.number,
        expiry: this.expiry,
        cvc: this.cvc,
      },
      startDate: bookedInfo.startDate,
      endDate: bookedInfo.endDate,
      headcount: bookedInfo.headcount,
      price: bookedInfo.price,
      img: bookedInfo.img,
    });

    window.location.reload();
  };

  render() {
    const { setOpenDatePicker, setOpenPayment, bookedInfo } = this.props;
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
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
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
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
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
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
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
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
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bookedInfo: state.book.bookedInfo,
});

export default connect(mapStateToProps)(PaymentForm);

/*
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
        cvc={card.cvc || ""}
        expiry={card.expiry || ""}
        focused={card.focus || ""}
        name={card.name || ""}
        number={card.number || ""}
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
*/
