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
      className="modal__content:Item"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__fieldset:item">
        <div className="modal__warning">
          Are you sure you want to delete this Item?
          <br />
          This action is irreversible.
        </div>
      </div>
      <button type="submit" className="modal__delete">
        Yes, delete item
      </button>
      <button type="submit" className="modal__cancel">
        Cancel
      </button>
    </ModalWithForm>
  );
};

export default DeleteItemModal;
