import React, { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard, handleLikeCard }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentUserId = currentUser._id || null;
  const [isLiked, setIsLiked] = useState(
    item.likes ? item.likes.includes(currentUserId) : false
  );

  const handleLikeClick = () => {
    if (currentUser) {
      handleLikeCard(item);
      setIsLiked(!isLiked);
    }
  };

  return (
    <div>
      <div className="card">
        <img
          src={item?.link || item?.imageUrl}
          alt={item.name}
          className="card__image"
          onClick={() => onSelectCard(item)}
        />
        {currentUser && (
          <button
            className={`like__button ${isLiked ? "liked" : "not-liked"}`}
            onClick={handleLikeClick}
          ></button>
        )}
      </div>
      <h3 className="card__name"> {item.name} </h3>
    </div>
  );
};

export default ItemCard;
