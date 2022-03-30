import React, { useState } from "react";

import "./Contact.css";
import {
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlineSend,
} from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";

const Contact = () => {
  const [startChat, setStartChat] = useState(false);

  const handleChat = (event) => {
    event.preventDefault();

    setStartChat(true);
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
            <button onClick={handleChat}>Start Online Chat</button>
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
                <div className="contact__form-user-name">housnap staff</div>
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
            <div className="contact__form-chat">chat</div>
            <div className="contact__form-input">
              <div className="contact__form-input-wrapper">
                <div className="contact__form-input-emoji">
                  <BsEmojiSmile />
                </div>
                <input type="text" placeholder="Start Chatting" />
                <button>
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
