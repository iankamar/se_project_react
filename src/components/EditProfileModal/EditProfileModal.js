import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({
  isOpen,
  onCloseModal,
  currentUser,
  handleProfileUpdate,
  isLoading,
}) => {
  useEffect(() => {
    setName(currentUser?.name);
    setAvatar(currentUser?.avatar);
  }, [currentUser, isOpen]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfileUpdate({
      name: name ?? undefined,
      avatar: avatar ?? undefined,
      token: localStorage.getItem("token"),
    });
  };

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleAvatarInput = (e) => {
    setAvatar(e.target.value);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="update"
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name*
      </label>
      <input
        id="name"
        className="modal__input"
        name="name"
        type="name"
        value={name}
        onChange={handleNameInput}
        placeholder="Name"
      ></input>
      <label htmlFor="avatar" className="modal__label">
        Avatar*
      </label>
      <input
        id="avatar"
        className="modal__input"
        name="avatar"
        type="url"
        value={avatar}
        onChange={handleAvatarInput}
        placeholder="Avatar URL"
      ></input>
    </ModalWithForm>
  );
};

export default EditProfileModal;
