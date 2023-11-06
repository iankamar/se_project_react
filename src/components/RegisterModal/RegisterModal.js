import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

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
    history.push("/profile");
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
      <h3 className="modal__label">Email</h3>
      <input
        className="modal__input"
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <h3 className="modal__label">Password</h3>
      <input
        className="modal__input"
        name="password"
        type="text"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <h3 className="modal__label">Name</h3>
      <input
        className="modal__input"
        name="name"
        type="text"
        value={credentials.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <h3 className="modal__label">Avatar URL</h3>
      <input
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
