import React, { useContext } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const SideBar = ({ handleLogout, updateProfile }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div style={{ zIndex: "100" }}>
      <div className="profile__avatar">
        <img src={currentUser?.avatar} alt="avatar" />
        <Link to="/profile">{currentUser?.name}</Link>
      </div>

      <div className="profile__info">
        <button className="profile__button" onClick={updateProfile}>
          Change profile data
        </button>
        <button className="profile__button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
