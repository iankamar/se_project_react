import React from "react";
import ItemCard from "../ItemCard/ItemCard";

const ClothingSection = ({ clothes, onSelectCard, onDeleteCard }) => {
  console.log(clothes);
  return (
    <div className="clothes__section">
      {clothes.map((item) => (
        /*
        <div key={item._id} className="clothes__items">
          <img src={item.imageUrl} alt={item.name} />
          <h3>{item.name}</h3>
        </div>
        */
        <ItemCard
          key={item.id}
          item={item}
          onSelectCard={onSelectCard}
          onDeleteCard={onDeleteCard}
        />
      ))}
    </div>
  );
};

export default ClothingSection;
