import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({
  isOpen,
  type,
  handleCloseModal,
  onCardDelete,
}) => {
  return (
    <div
      className={
        isOpen
          ? `confirm-modal modal_name_${type}`
          : `modal_name_${type} confirm-modal_closed`
      }
    >
      <div className="modal__body">
        <button className="close__button" onClick={handleCloseModal} />
        <h3 className="modal__paragraph">
          Are you sure you want to delete this item? <br></br> This action is
          irreversible.
        </h3>
        <button className="delete__button" onClick={onCardDelete}>
          Yes, delete item
        </button>
        <button className="cancel__button" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
