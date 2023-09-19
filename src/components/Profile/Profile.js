import React, { useState } from "react";
import avatar from "../../images/avatar.svg";
import { Link } from "react-router-dom";
import ProfileItemCard from "./ProfileItemCard/ProfileItemCard";
import { defaultClothingItems } from "../../utils/Constants";
import "./Profile.css";
import ItemModal from "../ItemModal/ItemModal";

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
          <div className="profile__avatar">
            <div>
              <img src={avatar} alt="avatar" />
            </div>
            <div>
              <Link to="/profile">Name</Link>
            </div>
          </div>
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
              <ProfileItemCard
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
