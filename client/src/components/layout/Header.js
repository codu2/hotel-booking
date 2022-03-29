import React from "react";

import "./Header.css";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";

const Header = () => {
  return (
    <div className="header__container">
      <table className="header__container-wrapper">
        <tbody className="header__container-info">
          <tr className="header__container-info1">
            <td>
              <AiOutlinePhone />
            </td>
            <td>+82 (012) 345 6789</td>
          </tr>
          <tr className="header__container-info2">
            <td>
              <AiOutlineMail />
            </td>
            <td>reception@housnap.com</td>
          </tr>
        </tbody>
        <tbody className="header__container-social">
          <tr className="header__container-social-icons">
            <td>
              <AiFillFacebook />
            </td>
            <td>
              <AiOutlineTwitter />
            </td>
            <td>
              <AiFillInstagram />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Header;
