import React, { useContext } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const SideBar = ({ openEditModal, handleLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div>
      <div className="profile__avatar">
        <img src={currentUser.avatar} alt="avatar" />
        <Link to="/profile">{currentUser.name}Ian Kamar</Link>
      </div>

      <div className="profile__info">
        <button className="profile__button" onClick={openEditModal}>
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
