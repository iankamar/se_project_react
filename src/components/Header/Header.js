import React, { useState, useContext } from "react";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Header.css";

const Header = ({
  isLoggedIn,
  onCreateModal,
  cityName,
  openLoginModal,
  openRegisterModal,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [date] = useState(new Date());

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to={"/"}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div>
          {date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
          , {cityName}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          {isLoggedIn ? (
            <button
              type="text"
              onClick={onCreateModal}
              className="header__item"
            >
              {" "}
              + Add clothes
            </button>
          ) : (
            <button className="header__button" onClick={openRegisterModal}>
              Sign up
            </button>
          )}
        </div>
        <div></div>
        {isLoggedIn ? (
          <Link to={"/profile"} className="header__profileLink">
            <h2 className="header__username">{currentUser.name}</h2>
            {currentUser.avatar === "" ? (
              <div className="header__avatarPlaceholder">
                {currentUser.name[0]}
              </div>
            ) : (
              <img
                className="header__avatarIcon"
                src={currentUser.avatar}
                alt="header__avatar"
              />
            )}
          </Link>
        ) : (
          <button className="header__button" onClick={openLoginModal}>
            Log in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
