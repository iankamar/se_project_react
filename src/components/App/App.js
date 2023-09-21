import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
/*import ModalWithForm from "../ModalWithForm/ModalWithForm";*/
import ItemModal from "../ItemModal/ItemModal";
import React, { /*useCallback,*/ useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherAPi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
/*import ClothesSection from "../Profile/ClothesSection/ClothesSection"; */
import { defaultClothingItems } from "../../utils/Constants";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import { getItemList, addItem, removeItem } from "../../utils/Api";
import "./App.css";
/*import { Link } from "react-router-dom/cjs/react-router-dom.min";*/

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  /*const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);*/
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  /*const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };*/

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

  const handleDeleteItem = (itemCard) => {
    removeItem(itemCard.id)
      .then((itemCard) => {
        const deleteId = itemCard.id;
        const updateItems = clothingItems.filter((itemCard) => {
          return itemCard.id !== deleteId;
        });
        setClothingItems(updateItems);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddItem = (itemCard) => {
    console.log(itemCard);
    const item = {
      name: itemCard.name,
      link: itemCard.link,
      weather: itemCard.weatherType,
    };
    addItem(item)
      .then((res) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error fetching item list: ");
      });
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  /*
  const onAddItem = (itemCard) => {
    console.log(itemCard);
    const newCard = { ...itemCard, weather: itemCard.weatherType };
    setClothingItems([...clothingItems, newCard]);
  };
*/

  /*
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  }; */
  /*
  const handleDeleteItem = useCallback(() => {
    console.log(selectedCard._id);
    setClothingItems((prevItems) =>
      prevItems.filter((item) => item._id !== selectedCard._id)
    );
  }, []); */

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((error) => {
        console.error("Error fetching weather data: ");
      });
  }, []);

  useEffect(() => {
    getItemList()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching item list: ");
      });
  }, []);
  /*
  useEffect(() => {
    const item = {
      name: "Item Name",
      link: "Item Link",
      weather: "Weather Type",
    };

    addItem(item)
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching item list: ", error);
      });
  }, []);

  useEffect(() => {
    const id = "id";

    removeItem(id)
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching item list: ", error);
      });
  }, []);
  
  useEffect(() => {
    addItem()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching item list: ");
      });
  }, []);

  useEffect(() => {
    removeItem()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching item list: ");
      });
  }, []);
*/

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const handleClickClose = (e) => {
      if (
        e.target.classList.contains("item_modal") ||
        e.target.classList.contains("modal")
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleClickClose);

    return () => {
      document.removeEventListener("click", handleClickClose);
    };
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
            <Profile
              handleAddClick={setActiveModal}
              clothingItems={clothingItems}
              onSelectCard={handleSelectedCard}
            />
          </Route>
        </Switch>
        <Footer className="profile__footer" />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={handleAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onDeleteItem={handleDeleteItem}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App; /*

/*
{isDeleteModalOpen && (
          <DeleteItemModal
            /*isDeleteModalOpen={handleSelectedCard}*/ /*
            handleCloseModal={handleCloseDeleteModal}
            handleDeleteItem={handleDeleteItem}
            isOpen={isDeleteModalOpen}
            itemId={selectedCard.id}
          />
        )}
*/
