/*import logo from "./logo.svg";*/
import Header from "../Header/Header";
/*import WeatherCard from "../WeatherCard/WeatherCard";*/
/*import ItemCard from "../ItemCard/ItemCard";*/
import Main from "../Main/Main";
import Footer from "../footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../Main/ItemModal/ItemModal";
import { useEffect, useState } from "react";
import "./App.css";
import { getForecastWeather, parseWeatherData } from "../utils/weatherAPi";

function App() {
  /*const weatherTemp = 65;*/
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getForecastWeather().then((data) => {
      const temperature = parseWeatherData(data);
      console.log(temperature);
      setTemp(temperature);
    });
  }, []);

  console.log(temp);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New garment" onClose={handleCloseModal}>
          <div className="modal__fieldset">
            <label className="modal__label">
              Name
              <input
                type="text"
                name="name"
                minLength="1"
                maxLength="30"
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
                className="modal__input"
                placeholder="Image URL"
                required
              />
            </label>
          </div>
          <p className="modal__label"> Select the weather type:</p>
          <div className="modal__label">
            <div>
              <input type="radio" id="hot" value="hot" />
              <label>Hot</label>
            </div>
            <div>
              <input type="radio" id="warm" value="warm" />
              <label>Warm</label>
            </div>
            <div>
              <input type="radio" id="cold" value="cold" />
              <label>Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
