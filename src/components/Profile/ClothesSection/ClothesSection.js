import React from "react";
import ItemCard from "../../ItemCard/ItemCard";
import { defaultClothingItems } from "../../../utils/Constants";
import "./ClothesSection.css";

const ClothesSection = ({ onSelectCard, onDeleteCard, onAddNew }) => {
  return (
    <div className="clothes__section">
      <h1>Clothing Section</h1>
      <div className="clothes__wrapper">
        <h2>Your items</h2>
        <button onClick={onAddNew}>+ Add New</button>
      </div>
      <div className="clothes__items">
        {defaultClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            itemName={item.name}
            item={item}
            onSelectCard={onSelectCard}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
