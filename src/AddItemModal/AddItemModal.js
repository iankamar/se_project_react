import React, { useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weatherType, setWeatherType] = useState("");
  const handleWeatherTypeChange = (e) => {
    if (weatherType === e.target.value) {
      setWeatherType("");
    } else {
      setWeatherType(e.target.value);
    }
  };

  /*
  const handleWeatherTypeChange = (e) => {
    setWeatherType((e.target.value)
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weatherType });
    handleCloseModal();
  };

  return (
    <ModalWithForm
      title="New garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__fieldset">
        <label className="modal__label">
          Name
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
            className="modal__input"
            placeholder="Name"
            required
          />
        </label>
      </div>
      <div className="modal__fieldset">
        <label className="modal__label">
          Image
          <input
            type="url"
            name="link"
            minLength="1"
            maxLength="30"
            value={link}
            onChange={handleUrlChange}
            className="modal__input"
            placeholder="Image URL"
            required
          />
        </label>
      </div>
      <p className="modal__label"> Select the weather type:</p>
      <div className="modal__labelSelect">
        <div>
          <input
            type="radio"
            id="hot"
            value="hot"
            checked={weatherType === "hot"}
            onChange={handleWeatherTypeChange}
          />
          <label>Hot</label>
        </div>
        <div>
          <input
            type="radio"
            id="warm"
            value="warm"
            checked={weatherType === "warm"}
            onChange={handleWeatherTypeChange}
          />
          <label>Warm</label>
        </div>
        <div>
          <input
            type="radio"
            id="cold"
            value="cold"
            checked={weatherType === "cold"}
            onChange={handleWeatherTypeChange}
          />
          <label>Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;