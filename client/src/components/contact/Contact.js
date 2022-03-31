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

const Contact = () => {
  const [startChat, setStartChat] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
  });
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState("");
  const [notification, setNotification] = useState([]);
  const [receiver, setReceiver] = useState(
    userInfo.name === "housnap" ? "john" : "housnap"
  );

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", userInfo.name);
  }, [socket, userInfo]);

  useEffect(() => {
    socket?.on("notification", (data) => {
      setNotification((prev) => [
        ...prev,
        {
          sender: data.name,
          chat: data.chat,
        },
      ]);
    });
  }, [socket]);

  const handleInfo = (event) => {
    event.preventDefault();

    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleChatForm = (event) => {
    event.preventDefault();

    if (userInfo.name.length !== 0 && userInfo.phoneNumber.length !== 0) {
      setStartChat(true);
    } else {
      window.alert("Please enter both your name and phone number.");
    }
  };

  const handleChat = (event) => {
    event.preventDefault();

    setChat(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setChat("");

    socket?.emit("sendChat", {
      name: userInfo.name,
      receiver,
      chat: chat,
    });
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
                onChange={handleInfo}
                autoComplete="off"
              />
              <label htmlFor="phoneNumber" autoComplete="off">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                onChange={handleInfo}
              />
            </div>
            <button onClick={handleChatForm}>Start Online Chat</button>
          </div>
        )}
        {startChat && (
          <div className="contact__form">
            <div className="contact__form-user-wrapper">
              <div className="contact__form-user">
                <img
                  src={`https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80`}
                  alt="housnap img"
                />
                <div className="contact__form-user-name">{userInfo.name}</div>
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
              <div className="contact__form-chat-default">
                <div className="contact__form-chat-default-info">
                  <img
                    src={`https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80`}
                    alt="housnap reception img"
                  />
                  <div className="contact__form-chat-default-chat">
                    <div>
                      Hello, <span>{userInfo.name}</span>. <br /> What kind of
                      help do you?
                    </div>
                  </div>
                </div>
              </div>
              {notification.map((data) => (
                <div className="contact__form-chat-default">
                  <div className="contact__form-chat-default-info">
                    <img
                      src={`https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80`}
                      alt="housnap reception img"
                    />
                    <div className="contact__form-chat-default-chat">
                      <div>{data.chat}</div>
                    </div>
                  </div>
                </div>
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
                  value={chat}
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
