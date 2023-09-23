import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../UseState/UseState";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const { name, setName } = useForm("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weatherType });
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
            maxLength="2048"
            value={link}
            onChange={handleUrlChange}
            className="modal__input"
            placeholder="Image URL"
            required
          />
        </label>
        {link && (
          <img
            src={link}
            alt="Preview"
            style={{ width: "100px", height: "100px" }}
          />
        )}
      </div>
      <p className="modal__label"> Select the weather type:</p>
      <div className="modal__labelSelect">
        <div>
          <label>
            <input
              type="radio"
              id="hot"
              value="hot"
              name="weatherType"
              onChange={handleWeatherTypeChange}
            />
            Hot
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="warm"
              value="warm"
              name="weatherType"
              onChange={handleWeatherTypeChange}
            />
            Warm
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="cold"
              value="cold"
              name="weatherType"
              onChange={handleWeatherTypeChange}
            />
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
