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
      });
  };

  const handleAddItem = (itemCard) => {
    console.log(itemCard);

    const handleItemRequest = () => {
      const item = {
        name: itemCard.name,

        link: itemCard.link,

        weather: itemCard.weatherType,
      };

      return addItem(item).then((item) => {
        setClothingItems([item, ...clothingItems]);
      });
    };

    handleSubmit(handleItemRequest);
  };

  /*buttonText={isLoading ? "Saving..." : "Save"} */

  function handleSubmit(request) {
    setIsLoading(true);

    request()
      .then(handleCloseModal)
      .catch(console.error)
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

/*
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherAPi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { Switch } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { defaultClothingItems } from "../../utils/Constants";
import { getItemList, addItem, removeItem } from "../../utils/api";
import { register, login, checkToken } from "../../utils/api";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
// import PrivateRoute from "./PrivateRoute";

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleAddItem = (itemCard) => {
    console.log(itemCard);

    const handleItemRequest = () => {
      const item = {
        name: itemCard.name,

        link: itemCard.link,

        weather: itemCard.weatherType,
      };

      return addItem(item).then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal(item);
      });
    };

    handleSubmit(handleItemRequest);
  };

  /*buttonText={isLoading ? "Saving..." : "Save"} */
/*
  const handleSubmit = (request) => {
    setIsLoading(true);

    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then((res) => {
        if (res) {
          handleLogin({ email, password });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsAuthenticated(true);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => setIsAuthenticated(res))
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetch("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setCurrentUser(data))
        .catch((error) => console.error(error));
    }
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
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
            <PrivateRoute path="/profile" isAuthenticated={isAuthenticated}>
              <Profile
                handleAddClick={setActiveModal}
                clothingItems={clothingItems}
                onSelectCard={handleSelectedCard}
                handleSignOut={handleSignOut}
              />
            </PrivateRoute>
            <Route path="/register">
              <RegisterModal onRegister={handleRegister} />{" "}
            </Route>
            <Route path="/login">
              <LoginModal onLogin={handleLogin} />{" "}
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
      </div>
    </CurrentUserContext.Provider>
  );
}

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
*/
