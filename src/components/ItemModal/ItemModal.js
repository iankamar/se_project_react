import React, { useState } from "react";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";

const ItemModal = ({ selectedCard, onClose, handleOpenDeleteModal }) => {
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
            onClick={handleOpenDeleteModal}
          >
            Delete item
          </button>
        </div>
        <div className="modal__weatherType">
          Weather type: {selectedCard.weather}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
