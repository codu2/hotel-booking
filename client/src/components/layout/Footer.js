import React from "react";

import "./Footer.css";
import {
  AiFillHome,
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillInstagram,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai";
import { MdAirplanemodeActive } from "react-icons/md";

const Footer = () => {
  return (
    <div className="footer__container">
      <div className="footer__wrapper-left">
        <div className="footer__logo">
          <span>
            <AiFillHome />
          </span>
          <span>HOUSNAP</span>
        </div>
        <div className="footer__paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius
          vel pharetra vel turpis nunc eget lorem. Ullamcorper a lacus
          vestibulum sed arcu non odio euismod lacinia.
        </div>
        <ul className="footer__social">
          <li>
            <AiFillFacebook />
          </li>
          <li>
            <AiOutlineTwitter />
          </li>
          <li>
            <AiFillInstagram />
          </li>
        </ul>
      </div>
      <div className="footer__wrapper-right">
        <div className="footer__menu">
          <h1>sitemap</h1>
          <ul>
            <li>About Us</li>
            <li>Services</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer__menu">
          <h1>info</h1>
          <ul>
            <li>
              <AiOutlinePhone />
            </li>
            <li>+82 (012) 345 6789</li>
            <li>
              <AiOutlineMail />
            </li>
            <li>reception@housnap.com</li>
          </ul>
        </div>
        <div className="footer__menu">
          <h1>get our newletter</h1>
          <div className="footer__menu-input">
            <input type="email" placeholder="email@email.com" />
            <button>
              <MdAirplanemodeActive />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
