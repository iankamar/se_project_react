import React, { useState } from "react";
import { defaultClothingItems } from "../../utils/Constants";
import "./Profile.css";
import ItemModal from "../ItemModal/ItemModal";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

const Profile = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const onSelectCard = (item) => {
    setSelectedCard(item);
  };

  const onClose = () => {
    setSelectedCard(null);
  };

  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__wrapper">
          <SideBar />
          <div className="profile__items">
            <h4>Your items</h4>
            <button type="text" className="profile__item">
              {" "}
              + Add New{" "}
            </button>
          </div>
        </div>

        <div className="profile__itemSection">
          <div className="profile__sidebar">
            {/* Sidebar content goes here */}
          </div>
          <div className="profile__itemsCard">
            {defaultClothingItems.map((item) => (
              <ClothesSection
                key={item._id}
                item={item}
                onSelectCard={() => onSelectCard(item)}
              />
            ))}
          </div>
        </div>
        {selectedCard && (
          <ItemModal selectedCard={selectedCard} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default Profile;
