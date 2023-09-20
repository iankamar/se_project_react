import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import React, { useCallback, useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherAPi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ClothesSection from "../Profile/ClothesSection/ClothesSection";
import { defaultClothingItems } from "../../utils/Constants";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import { getItemList, addItem, removeItem } from "../../utils/Api";
import "./App.css";

function App({ handleAddClick }) {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const api = {
    getItemList,
    addItem,
    removeItem,
  };

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

  const onAddItem = (itemCard) => {
    console.log(itemCard);
    const newCard = { ...itemCard, weather: itemCard.weatherType };
    setClothingItems([...clothingItems, newCard]);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleDeleteItem = useCallback(() => {
    console.log(selectedCard._id);
    setClothingItems((prevItems) =>
      prevItems.filter((item) => item._id !== selectedCard._id)
    );
  }, []);

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
  console.log(handleDeleteItem);
  console.log(isDeleteModalOpen);
  console.log(activeModal);

  useEffect(() => {
    getItemList()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    addItem()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    removeItem()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} temp={temp} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile handleAddClick={setActiveModal}>
              <ClothesSection clothes={clothingItems} />
            </Profile>
          </Route>
        </Switch>
        <Footer className="profile__footer" />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            // onAddItem={onAddItem}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleOpenDeleteModal={handleOpenDeleteModal}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteItemModal
            /*isDeleteModalOpen={handleSelectedCard}*/
            handleCloseModal={handleCloseDeleteModal}
            handleDeleteItem={handleDeleteItem}
            isOpen={isDeleteModalOpen}
            itemId={selectedCard.id}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
