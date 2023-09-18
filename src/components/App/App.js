import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherAPi";
import { currentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ClothingSection from "../ClothesSection/ClothesSection";
import { defaultClothingItems } from "../../utils/Constants";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

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

  const onAddItem = (values) => {
    console.log(values);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const onDeleteItem = (itemId) => {
    let items = [...clothingItems];
    const index = items.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      items.splice(index, 1);
    }
    setClothingItems(items);
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
  return (
    <div>
      <currentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} temp={temp} />
        <Switch>
          <Route exact path="/">
            <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
          </Route>
          <Route path="/profile">
            <Profile>
              <ClothingSection clothes={defaultClothingItems} />
            </Profile>
          </Route>
        </Switch>
        <Footer className="profile__footer" />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
        {isDeleteModalOpen && (
          <DeleteItemModal
            handleCloseModal={handleCloseDeleteModal}
            onDeleteItem={onDeleteItem}
            isOpen={isDeleteModalOpen}
          />
        )}
      </currentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
