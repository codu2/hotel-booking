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
  const [name, setName] = useState("");
  const [room, setRoom] = useState("housnap");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("join", { name, room });
  }, [startChat === true]);

  useEffect(() => {
    socket?.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  const handleInfo = (event) => {
    event.preventDefault();

    setName(event.target.value);
  };

  const handleChatForm = (event) => {
    event.preventDefault();

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
                //onChange={handleInfo}
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
              <div className="contact__form-chat-message-form">
                {messages.length > 0 &&
                  messages.map((message) => (
                    <div className="contact__form-chat-message">
                      <div className="contact__form-chat-message-info">
                        <div className="contact__form-chat-message-chat">
                          <div>{message.text}</div>
                        </div>
                        <img
                          src={`https://images.unsplash.com/photo-1517400508447-f8dd518b86db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60`}
                          alt="user img"
                        />
                      </div>
                    </div>
                  ))}
              </div>
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
