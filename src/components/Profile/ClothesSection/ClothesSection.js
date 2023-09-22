import React from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

const ClothesSection = ({ clothingItems, onSelectCard }) => {
  return (
    <div className="profile__itemsCard">
      {clothingItems.map((item) => (
        <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
      ))}
    </div>
  );
};

export default ClothesSection;
