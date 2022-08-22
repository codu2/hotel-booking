import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import "./Contact.css";
import {
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlinePicture,
  AiOutlineSend,
} from "react-icons/ai";
import Message from "./Message";

const Contact = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startChat, setStartChat] = useState(false);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("housnap");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSocket(io("http://localhost:5000", { transports: ["websocket"] }));
  }, []);

  useEffect(() => {
    socket?.emit("join", { name, room });
  }, [startChat === true]);

  useEffect(() => {
    socket?.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  const handleName = (event) => {
    event.preventDefault();

    setName(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    event.preventDefault();

    setPhoneNumber(event.target.value);
  };

  const handleChatForm = (event) => {
    event.preventDefault();

    if ((name.length === 0) | (phoneNumber.length === 0)) {
      alert("Please check your name and phone number");
      return;
    }
    setStartChat(true);
  };

  const handleChat = (event) => {
    event.preventDefault();

    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message) {
      socket?.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div className="contact__container">
      <div className="contact__wrapper">
        <div className="contact__title">Contact Us</div>
        {!startChat && (
          <div className="contact__info">
            <p>
              If you have any questions about reservation changes,
              cancellations, or refund policies, please start chatting.
            </p>
            <p>
              We will reply within 4 hours on average and notify you in advance
              that your response may be delayed after 10 p.m.
            </p>
            <span>
              If you want to start chatting, please enter your name and phone
              number.
            </span>
            <div className="contact__info-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleName}
                autoComplete="off"
                value={name}
              />
              <label htmlFor="phoneNumber" autoComplete="off">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                onChange={handlePhoneNumber}
                autoComplete="off"
                value={phoneNumber}
              />
            </div>
            <button onClick={handleChatForm}>Start Online Chat</button>
          </div>
        )}
        {startChat && (
          <div className="contact__form">
            <div className="contact__form-user-wrapper">
              <div className="contact__form-user">
                <div className="contact__form-user-img">
                  {name === "admin" ? (
                    <img
                      src={`https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80`}
                      alt="housnap img"
                    />
                  ) : (
                    name?.charAt(0)
                  )}
                </div>
                <div className="contact__form-user-name">
                  {name === "admin" ? "housnap" : name}
                </div>
              </div>
              <div className="contact__form-action">
                <div>
                  <AiOutlineBell />
                  <span>2</span>
                </div>
                <div>
                  <AiOutlineMail />
                  <span>2</span>
                </div>
                <div>
                  <AiOutlineSetting />
                </div>
              </div>
            </div>
            <div className="contact__form-chat">
              <p
                style={{
                  textAlign: "center",
                  color: "#afafaf",
                  fontSize: "14px",
                }}
              >
                Conversations are kept for up to 48 hours.
              </p>
              {messages.length > 0 &&
                messages.map((message, i) => (
                  <Message message={message} key={i} />
                ))}
            </div>
            <div className="contact__form-input">
              <div className="contact__form-input-wrapper">
                <div className="contact__form-input-picture">
                  <AiOutlinePicture />
                </div>
                <input
                  type="text"
                  placeholder="Start Chatting"
                  onChange={handleChat}
                  value={message}
                  onKeyPress={(event) =>
                    event.key === "Enter" ? handleSubmit(event) : null
                  }
                />
                <button onClick={handleSubmit}>
                  <AiOutlineSend />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;

// /chat?name=${name}&room=${room}
