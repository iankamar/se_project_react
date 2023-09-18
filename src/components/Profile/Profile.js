import React, { useState } from "react";
import avatar from "../../images/avatar.svg";
import { Link } from "react-router-dom";
import ItemCard from "../ItemCard/ItemCard";
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
      <div className="sidebar">{/* Sidebar content goes here */}</div>
      <div className="profile__content">
        <div className="profile__avatar">
          <div>
            <img src={avatar} alt="avatar" />
          </div>
          <div>
            <Link to="/profile">Name</Link>
          </div>
        </div>
        <div className="clothes__section">
          <h2>Your items</h2>
          <div className="card__items">
            {defaultClothingItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onSelectCard={() => onSelectCard(item)}
              />
            ))}
          </div>
        </div>
        {selectedCard && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={onClose}
            // Pass your onDeleteItem function here
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
