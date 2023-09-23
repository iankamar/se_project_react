import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import React, { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherAPi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { defaultClothingItems } from "../../utils/Constants";
import { getItemList, addItem, removeItem } from "../../utils/api";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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

  const handleDeleteItem = (selectedCard) => {
    removeItem(selectedCard._id)
      .then((res) => {
        const deleteId = selectedCard._id;
        const updateItems = clothingItems.filter((item) => {
          return item._id !== deleteId;
        });
        setClothingItems(updateItems);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      })
      .finally(() => setIsLoading(false));
  };
  /*
  const handleAddItem = (itemCard) => {
    console.log(itemCard);
    const item = {
      name: itemCard.name,
      link: itemCard.link,
      weather: itemCard.weatherType,
    };
    setIsLoading(true);

    addItem(item)
      .then((res) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error fetching item list: ");
      })
      .finally(() => setIsLoading(false));
  };*/

  const handleAddItem = (itemCard) => {
    console.log(itemCard);
    const itemRequest = () => {
      const item = {
        name: itemCard.name,
        link: itemCard.link,
        weather: itemCard.weatherType,
      };
      return addItem(item);
    };
    setIsLoading(true);
    handleSubmit(itemRequest);
  };
  /*buttonText={isLoading ? "Saving..." : "Save"} */

  function handleSubmit(request) {
    setIsLoading(true);

    request()
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error fetching item list:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        setCityName(data.cityName);
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
    if (!activeModal) return;
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
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header
        onCreateModal={handleCreateModal}
        temp={temp}
        cityName={cityName}
      />
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
          handleOpenDeleteModal={handleDeleteItem}
        />
      )}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
