import React from "react";
import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img
          src={item.link}
          alt={item.name}
          className="card__image"
          onClick={() => onSelectCard(item)}
        />
      </div>
      <h3 className="card__name"> {item.name} </h3>
    </div>
  );
};

export default ItemCard;
