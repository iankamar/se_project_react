import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

const DeleteItemModal = ({
  type,
  onCloseModal,
  handleDeleteItem,
  isOpen,
  selectedCard,
}) => {
  const handleSubmit = () => {
    handleDeleteItem(selectedCard);
    onCloseModal(selectedCard);
  };

  return (
    <ModalWithForm
      className="modal__content:Item"
      onClose={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      type={type}
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
      <button type="button" className="modal__cancel" onClick={onCloseModal}>
        Cancel
      </button>
    </ModalWithForm>
  );
};

export default DeleteItemModal;
