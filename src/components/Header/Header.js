import React, { useState, useEffect } from "react";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import "./Header.css";
import { getForecastWeather } from "../../utils/weatherAPi";

const Header = ({ onCreateModal }) => {
  const [date, setDate] = useState(new Date());
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    getForecastWeather().then(({ cityName }) => setCityName(cityName));
  }, []);

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
