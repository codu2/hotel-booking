import React from "react";

import "./Message.css";

const Message = ({ message: { user, text } }) => {
  let isSentByUser = true;

  if (user === "admin") {
    isSentByUser = false;
  }

  return isSentByUser ? (
    <div className="contact__form-chat-message-form justifyEnd">
      <div className="contact__form-chat-message">
        <div className="contact__form-chat-message-info">
          <div className="contact__form-chat-message-chat">
            <div>{text}</div>
          </div>
          <img
            src={`https://images.unsplash.com/photo-1517400508447-f8dd518b86db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60`}
            alt="user img"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="contact__form-chat-message-form justifyStart">
      <div className="contact__form-chat-message">
        <div className="contact__form-chat-message-info">
          <img
            src={`https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80`}
            alt="housnap img"
          />
          <div className="contact__form-chat-message-chat">
            <div>{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
