import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

const ItemModal = ({
  selectedCard,
  onClose,
  handleDeleteClick,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn =
    selectedCard &&
    selectedCard.owner &&
    selectedCard.owner._id === currentUser?._id;

  const itemDeleteButton = `modal__deleteItem ${
    isOwn ? "modal__deleteItem_visible" : "modal__deleteItem_hidden"
  }`;
  const handleClick = () => {
    handleDeleteClick(selectedCard);
  };

  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button type="button" onClick={onClose} className="modal__close">
          &#x2715;
        </button>
        <img src={selectedCard.imageUrl} alt={selectedCard.name} />
        {isLoggedIn ? (
          <div className="modal__align">
            <h3> {selectedCard.name}</h3>
            {selectedCard &&
              currentUser &&
              selectedCard.owner === currentUser._id && (
                <button
                  type="button"
                  className={itemDeleteButton}
                  onClick={handleClick}
                >
                  Delete item
                </button>
              )}
          </div>
        ) : (
          <></>
        )}
        <div className="modal__weatherType">
          Weather type:{" "}
          {selectedCard.weather
            ? selectedCard.weather
            : selectedCard.weatherType}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
