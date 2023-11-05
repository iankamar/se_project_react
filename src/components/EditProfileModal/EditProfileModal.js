/*
import { useContext, useState } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { updateUser } from "./api";

function EditProfileModal() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUser(currentUser._id, name, avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        value={avatar}
        onChange={(event) => setAvatar(event.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditProfileModal;
*/
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
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [isOpen]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    handleProfileUpdate({
      name,
      avatar,
      token: localStorage.getItem("token"),
    })
      .then(() => {
        onCloseModal();
      })
      .catch((err) => {
        console.log(err);
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
      <h4>Name*</h4>
      <input
        className="form__input"
        name="name"
        type="name"
        value={name}
        onChange={handleNameInput}
        placeholder="Name"
      ></input>
      <h4>Avatar*</h4>
      <input
        className="form__input"
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
