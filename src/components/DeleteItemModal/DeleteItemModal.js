import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

const DeleteItemModal = ({ handleCloseModal, onDeleteItem, isOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    /*onDeleteItem();*/
    handleCloseModal();
  };

  return (
    <ModalWithForm
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__warning">
        <p>
          Are you sure you want to delete this Item? This action is
          irreversible.
        </p>
        <button type="submit" className="modal__delete">
          Yes, delete item
        </button>
        <button type="submit" className="modal__cancel">
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
};

export default DeleteItemModal;
