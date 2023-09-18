import React from "react";
import avatar from "../../images/avatar.svg";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile__avatar">
      <div>
        <img src={avatar} alt="avatar" />{" "}
      </div>
      <div>
        <Link to="/profile">Name</Link>
      </div>
    </div>
  );
};

export default Profile;
