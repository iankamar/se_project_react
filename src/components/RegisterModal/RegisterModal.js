import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  handleCloseModal,
  handleRegistration,
  handleToggleModal,
  isLoading,
}) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    setCredentials({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });
  }, [isOpen]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting registration form with credentials:", credentials);
    handleRegistration(credentials);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="register"
      title="Sign up"
      buttonText={isLoading ? "Loading..." : "Next"}
      onCloseModal={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email*
        <input
          className="modal__input"
          name="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          className="modal__input"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          name="name"
          type="text"
          value={credentials.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          name="avatar"
          type="url"
          value={credentials.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
      </label>
      <button
        type="button"
        className="modal__register"
        onClick={handleToggleModal}
      >
        or Log in
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
