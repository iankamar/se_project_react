/*
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onRegister, isOpen,
  onCloseModal,
  handleRegistration,
  handleToggleModal,
  isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister({ email, password, name, avatar });
    history.push("/profile");
  };

  return (
    <ModalWithForm title="Register" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
*/
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
      <h4 className="form__label">Email*</h4>
      <input
        className="form__input"
        name="email"
        type="email"
        value={email}
        onChange={handleEmail}
        placeholder="Email"
        required
      />
      <h4 className="form__label">Password*</h4>
      <input
        className="form__input"
        name="password"
        type="text"
        value={password}
        onChange={handlePassword}
        placeholder="Password"
        required
      />
      <h4 className="form__label">Name</h4>
      <input
        className="form__input"
        name="name"
        type="text"
        value={name}
        onChange={handleName}
        placeholder="Name"
      />
      <h4 className="form__label">Avatar URL</h4>
      <input
        className="form__input"
        name="avatar"
        type="url"
        value={avatar}
        onChange={handleAvatar}
        placeholder="Avatar URL"
      />

      <p className="modal__form-btn_alt" onClick={handleToggleModal}>
        or Log in
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;
