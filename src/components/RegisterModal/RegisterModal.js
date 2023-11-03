import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  return (
    <ModalWithForm title="Register" onSubmit={handleSubmit}>
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

export default RegisterModal;
