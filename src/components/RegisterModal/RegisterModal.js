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
      <label input="email" className="modal__label">
        Email*
      </label>
      <input
        id="email"
        className="modal__input"
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <label input="password" className="modal__label">
        Password*
      </label>
      <input
        id="password"
        className="modal__input"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <label input="name" className="modal__label">
        Name
      </label>
      <input
        id="name"
        className="modal__input"
        name="name"
        type="text"
        value={credentials.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <label input="avatar" className="modal__label">
        Avatar URL
      </label>
      <input
        id="avatar"
        className="modal__input"
        name="avatar"
        type="url"
        value={credentials.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
      />

      <p className="modal__register" onClick={handleToggleModal}>
        or Log in
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;
