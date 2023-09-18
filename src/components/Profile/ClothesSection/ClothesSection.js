import React from "react";
import ItemCard from "../../ItemCard/ItemCard";
import { defaultClothingItems } from "../../../utils/Constants";

const ClothingSection = ({ onSelectCard, onDeleteCard }) => {
  return (
    <div className="clothes__section">
      <h2>Your items</h2>
      <div className="card_items">
        {defaultClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onSelectCard={onSelectCard}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothingSection;
