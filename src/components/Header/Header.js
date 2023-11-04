/*
import React, { useState } from "react";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ onCreateModal, cityName }) => {
  const [date] = useState(new Date());

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          {date.toLocaleDateString("en-US", { month: "long", day: "numeric" })},{" "}
          {cityName}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button type="text" onClick={onCreateModal} className="header__item">
            {" "}
            + Add New Clothes
          </button>
        </div>
        <Link to="/profile">Ian Kamar</Link>
        <div>
          <img src={avatar} alt="avatar" />{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;
*/

import React, { useState, useContext } from "react";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import "./Header.css";

const Header = ({ onCreateModal, cityName }) => {
  const [date] = useState(new Date());
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          {date.toLocaleDateString("en-US", { month: "long", day: "numeric" })},{" "}
          {cityName}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button type="text" onClick={onCreateModal} className="header__item">
            {" "}
            + Add New Clothes
          </button>
        </div>
        <Link to="/profile">{currentUser?.name}Ian Kamar</Link>
        <div>
          {currentUser?.avatar ? (
            <img src={currentUser.avatar} alt="avatar" />
          ) : (
            <div className="avatar__placeholder">
              {currentUser?.name?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

/*
 </div>
        <Link to="/profile">Ian Kamar</Link>
        <div>
          <img src={avatar} alt="avatar" />{" "}
        </div>

        <Link to="/profile">{currentUser && currentUser.name}</Link>
        <div>
          {currentUser && currentUser.avatar ? (
            <img src={currentUser.avatar} alt="avatar" />
          ) : (
            <div className="avatar__placeholder">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div> */
