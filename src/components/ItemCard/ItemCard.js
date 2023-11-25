import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import { Heart } from "react-feather";

const ItemCard = ({ item, onSelectCard, handleLikeClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentUserId = currentUser && currentUser._id ? currentUser._id : null;
  const handleLike = () => {
    if (currentUser) {
      handleLikeClick(item);
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
        {currentUser && currentUser._id && (
          <div className="like__button" onClick={handleLike}>
            {item.likes && item.likes.includes(currentUserId) ? (
              <Heart className="heart__filled" />
            ) : (
              <Heart className="heart" />
            )}
          </div>
        )}
      </div>
      <h3 className="card__name"> {item.name} </h3>
    </div>
  );
};

export default ItemCard;
