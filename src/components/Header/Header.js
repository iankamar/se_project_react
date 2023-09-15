import React from "react";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import "./Header.css";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>Date</div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button type="text" onClick={onCreateModal} className="header__item">
            {" "}
            + Add New Clothes{" "}
          </button>
        </div>
        <div>Name</div>
        <div>
          <img src={avatar} alt="avatar" />{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;
