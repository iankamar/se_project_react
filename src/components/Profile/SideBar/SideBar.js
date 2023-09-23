import React from "react";
import "./SideBar.css";
import avatar from "../../../images/avatar.svg";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="profile__avatar">
      <div>
        <img src={avatar} alt="avatar" />
      </div>
      <div>
        <Link to="/profile">Ian Kamar</Link>
      </div>
    </div>
  );
};

export default SideBar;
