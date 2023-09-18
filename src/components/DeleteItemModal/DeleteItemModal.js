import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

const DeleteItemModal = ({ handleCloseModal, onDeleteItem, isOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteItem();
    handleCloseModal();
  };

  return (
    <ModalWithForm
      title="Delete Item"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__fieldset">
        <p>
          Are you sure you want to delete this Item? This action is
          irreversible.
        </p>
        <button
          type="submit"
          className="modal__save"
          style={{ backgroundColor: "red", color: "white" }}
        >
          Delete Item
        </button>
      </div>
    </ModalWithForm>
  );
};

export default DeleteItemModal;
