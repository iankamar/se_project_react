import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  onCloseModal,
  handleRegistration,
  handleToggleModal,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const history = useHistory();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }, [isOpen]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ name, avatar, email, password });
    history.push("/profile");
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="register"
      title="Sign up"
      buttonText={isLoading ? "Loading..." : "Next"}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
    >
      <h3 className="modal__label">Email</h3>
      <input
        className="modal__input"
        name="email"
        type="email"
        value={email}
        onChange={handleEmail}
        placeholder="Email"
        required
      />
      <h3 className="modal__label">Password</h3>
      <input
        className="modal__input"
        name="password"
        type="text"
        value={password}
        onChange={handlePassword}
        placeholder="Password"
        required
      />
      <h3 className="modal__label">Name</h3>
      <input
        className="modal__input"
        name="name"
        type="text"
        value={name}
        onChange={handleName}
        placeholder="Name"
      />
      <h3 className="modal__label">Avatar URL</h3>
      <input
        className="modal__input"
        name="avatar"
        type="url"
        value={avatar}
        onChange={handleAvatar}
        placeholder="Avatar URL"
      />

      <p className="modal__register" onClick={handleToggleModal}>
        or Log in
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;
