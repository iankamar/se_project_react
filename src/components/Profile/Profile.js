import React from "react";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

const Profile = ({
  allClothes,
  onSelectCard,
  handleCreateModal,
  clothingItems,
  updateProfile,
  handleLogout,
  handleLikeClick,
}) => {
  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__wrapper">
          <SideBar updateProfile={updateProfile} handleLogout={handleLogout} />
          <div className="profile__items">
            <label>Your items</label>
            <button
              type="button"
              onClick={() => handleCreateModal("create")}
              className="profile__item"
            >
              {" "}
              + Add New{" "}
            </button>
          </div>
        </div>

        <div className="profile__itemSection">
          <div className="profile__sidebar">
            {/* Sidebar content goes here */}
          </div>
          <ClothesSection
            allClothes={allClothes}
            clothingItems={clothingItems}
            onSelectCard={onSelectCard}
            handleLikeClick={handleLikeClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
