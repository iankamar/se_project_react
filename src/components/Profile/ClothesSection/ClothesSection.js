import React from "react";
import "./ClothesSection.css";

const ClothesSection = ({ item, onSelectCard, onDeleteCard }) => {
  return (
    <div className="card">
      <img
        src={item.link}
        alt={item.name}
        className="card__image"
        onClick={() => onSelectCard(item)}
      />
      <h3 className="card__name"> {item.name} </h3>
    </div>
  );
};

export default ClothesSection;
