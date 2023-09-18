import React from "react";
import "./SideBar.css";

class SideBar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <img
          className="sidebar__image"
          src="path_to_avatar_image"
          alt="User Avatar"
        />
        <h2 className="sidebar__title"> Username</h2>
      </div>
    );
  }
}

export default SideBar;
