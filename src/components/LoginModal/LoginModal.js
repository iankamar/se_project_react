/*

const LoginModal = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm title="Login" onSubmit={handleSubmit}>
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
    </ModalWithForm>
  );
};

export default LoginModal; */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  isOpen,
  handleCloseModal,
  handleLogin,
  handleToggleModal,
  showFormError,
  isLoading,
}) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isFormFilled, setIsFormFilled] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
    setIsFormFilled(credentials.email !== "" && credentials.password !== "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(credentials.email, credentials.password);
    history.push("/profile");
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="login"
      title="Log in"
      buttonText={
        isLoading ? "Loading..." : isFormFilled ? "Ready to Log in" : "Log in"
      }
      onCloseModal={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <h4 className={showFormError ? "form__label_error" : "form__label"}>
        {showFormError ? "Incorrect email or password" : "Email"}
      </h4>
      <input
        className={showFormError ? "form__input_error" : "form__input"}
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        name="email"
        required
      />
      <h4 className={showFormError ? "form__label_error" : "form__label"}>
        {showFormError ? "Incorrect email or password" : "Password"}
      </h4>
      <input
        className={showFormError ? "form__input_error" : "form__input"}
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        name="password"
        required
      />
      <p className="modal__form-btn_alt" onClick={handleToggleModal}>
        or Register
      </p>
    </ModalWithForm>
  );
};

export default LoginModal;
