import React from "react";
import "./ProfileItemCard.css";

const ProfileItemCard = ({ item, onSelectCard, onDeleteCard }) => {
  return (
    <div>
      <h3 className="card_name"> {item.name} </h3>
      <div>
        <img
          src={item.link}
          alt={item.name}
          className="card__image"
          onClick={() => onSelectCard(item)}
        />
      </div>
    </div>
  );
};

export default ProfileItemCard;
