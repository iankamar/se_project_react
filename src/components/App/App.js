import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useEffect, useState } from "react";
import "./App.css";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherAPi";
/*import CurrentTemperatureUnitContext; from "../../contexts/CurrentTemperatureUnitContext";*/

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  /*
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState({});
*/
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  /*
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit == "F"
    ? setCurrentTemperatureUnit ("C")
    : setCurrentTemperatureUnit ("F");
  };


*/
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  }, []);

  console.log(temp);
  /*
// The App component makes an API request for the weather data (only once - on mounting).
useEffect(() => {
  if (location.latitude && location.longtitude) {
    getForecastWeather(location, apiKey)
      .then((data) => {
        setWeatherData(filterDataFromWeatherAPI(data));
      })
      .catch((err) => console.log(err));
  }
}, []);

// The App component saves default clothing items in the state.

useEffect (() => {
  api.getItemList()
    .then((items) => {
      setClothingItems(items);
    })
    .catch((err) => console.log(err));
}, []);
*/
  return (
    /*<div className ="page">
      <CurrentTemperatureUnitContext.Provider
      value={{currentTemperatureUnit, handleToggleSwitchChange}}
      >

      <div ClassName = "page__wrapper">
        <Header
        weatherData = {weatherData}
        handleAddClick={() => setActiveModal("create")}
        />
        <Routes>
        <Route exact path="/" element= {
          weatherData.temperateure &&
          <Main
          weatherData = {weatherData}
          cards = {clothingItems}
          onCardClick = {handleCardClick}
          onCardDelete = {handleCardDelete}
          />
        }

        <Route exact path= "/profile" element = {
          clothingItems.length !== 0 &&
          <Profile
            cards = {clothingItems}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onAddNewClick={() =>setActiveModal(("create")}
        />
          }
          </Routes>
          <Footer/>
    </div> */
    /*
    {activeModal === "create" && (
      <AddItemModal onCloseModal={closeAllModals} onAddItem={handleAddItemSubmit} />
    )}
    {activeModal === "preview" && (
      <IteModal card = {selectedCard} onClose = {closeAllModals} />
    )}
    </CurrentTemperatureUnitContext.Provider/>
    </div>
    );
    };

    export default App;
    */
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
          <div className="modal__labelSelect">
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
