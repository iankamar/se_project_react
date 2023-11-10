import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const ClothesSection = ({
  clothingItems,
  onSelectCard,
  isLoggedIn,
  handleLikeClick,
}) => {
  const currentUser = useContext(CurrentUserContext);
  if (typeof onSelectCard !== "function") {
    return null;
  }
  return (
    <div className="profile__itemsCard">
      {clothingItems.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onSelectCard={onSelectCard}
          isLoggedIn={isLoggedIn}
          handleLikeClick={() => {
            handleLikeClick(
              item._id,
              item.likes.includes(currentUser._id),
              currentUser
            );
          }}
        />
      ))}
    </div>
  );
};

export default ClothesSection;
