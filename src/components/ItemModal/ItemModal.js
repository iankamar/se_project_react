import React from "react";
import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, handleOpenDeleteModal }) => {
  const handleClick = () => {
    handleOpenDeleteModal(selectedCard);
  };

  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button type="button" onClick={onClose} className="modal__close">
          &#x2715;
        </button>
        <img src={selectedCard.link} alt={selectedCard.name} />
        <div className="modal__align">
          <h3> {selectedCard.name}</h3>
          <button
            type="button"
            className="modal__deleteItem"
            onClick={handleClick}
          >
            Delete item
          </button>
        </div>
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

/*
import React, { useContext } from "react";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, handleOpenDeleteModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner._id === currentUser._id;
  const itemDeleteButton = `modal__deleteItem ${
    isOwn ? "modal__deleteItem_visible" : "modal__deleteItem_hidden"
  }`;

  const handleClick = () => {
    handleOpenDeleteModal(selectedCard);
  };

  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button type="button" onClick={onClose} className="modal__close">
          &#x2715;
        </button>
        <img src={selectedCard.link} alt={selectedCard.name} />
        <div className="modal__align">
          <h3> {selectedCard.name}</h3>
          <button
            type="button"
            className={itemDeleteButton}
            onClick={handleClick}
          >
            Delete item
          </button>
        </div>
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
*/
