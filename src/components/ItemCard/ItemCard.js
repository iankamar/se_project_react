import React from "react";
import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard, onCardLike, currentUser }) => {
  const isLiked = item.likes
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  const itemLikeButton = isLiked ? "liked" : "not-liked";

  const handleLikeClick = () => {
    if (currentUser) {
      onCardLike(item);
    }
  };

  return (
    <div>
      <div className="card">
        <img
          src={item.link}
          alt={item.name}
          className="card_image"
          onClick={() => onSelectCard(item)}
        />
        {currentUser && (
          <button className={itemLikeButton} onClick={handleLikeClick}>
            Like
          </button>
        )}
      </div>
      <h3 className="card_name"> {item.name} </h3>
    </div>
  );
};

export default ItemCard;
