import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import React, { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherAPi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { Route, Switch } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import Profile from "../Profile/Profile";
import { defaultClothingItems } from "../../utils/Constants";
import { useHistory } from "react-router-dom";
import {
  getItemList,
  addItem,
  removeItem,
  removeCardLike,
  addCardLike,
} from "../../utils/api";
import {
  register,
  login,
  authorize,
  getUser,
  updateUser,
} from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./App.css";

const App = () => {
  // States
  const [allClothes, setAllClothes] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [/*isAuthenticated, */ setIsAuthenticated] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

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
    const handleItemRequest = () => {
      const item = {
        name: itemCard.name,

        link: itemCard.link,

        weather: itemCard.weatherType,
      };

      return addItem(item).then((item) => {
        setClothingItems([item.data, ...clothingItems]);
      });
    };

    handleSubmit(handleItemRequest);
  };

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

  const handleToggleModal = () => {
    activeModal === "login"
      ? setActiveModal("register")
      : setActiveModal("login");
  };

  const fetchClothingItems = () => {
    getItemList()
      .then((data) => {
        if (data.length > 0) {
          setClothingItems(data);
        }
      })
      .catch((err) => console.log(err));
  };

  // User handlers
  const handleRegistration = ({ email, password, name, avatar }) => {
    register({ email, password, name, avatar })
      .then((res) => {
        if (res) {
          handleLogin({ email, password });
          handleCloseModal();
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleAuthorization = (email, password) => {
    setIsLoading(true);
    authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setIsLoggedIn(true);

        handleCloseModal();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateProfile = () => {
    setActiveModal("update");
  };

  const handleProfileUpdate = ({ name, avatar, token }) => {
    setIsLoading(true);

    updateUser(name, avatar, token)
      .then((res) => {
        setCurrentUser(res);
        handleCloseModal();
        return res;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Card handlers
  const handleLikeClick = (cardId, isLiked) => {
    const apiMethod = isLiked ? removeCardLike : addCardLike;

    apiMethod(cardId)
      .then((updatedCard) => {
        const updatedItems = clothingItems.map((item) => {
          if (item._id === updatedCard._id) {
            return updatedCard;
          }
          return item;
        });
        setClothingItems(updatedItems);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };

  // Effect

  useEffect(() => {
    getItemList()
      .then((clothes) => {
        setAllClothes(clothes);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
          setIsLoggedIn(false);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchClothingItems();
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
      if (e.target.classList.contains("modal__close")) {
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleClickClose);

    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, [activeModal]);

  useEffect(() => {
    function handleOverlay(evt) {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("item-modal") ||
        evt.target.classList.contains("confirm-modal")
      ) {
        handleCloseModal();
      }
    }
    document.addEventListener("click", handleOverlay);
    return () => document.removeEventListener("click", handleOverlay);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="Page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onCreateModal={handleCreateModal}
            temp={temp}
            cityName={cityName}
            weatherData={temp}
            openAddModal={() => {
              setActiveModal("add");
            }}
            openLoginModal={() => {
              setActiveModal("login");
            }}
            openRegisterModal={() => {
              setActiveModal("register");
            }}
            isLoggedIn={isLoggedIn}
          />
          <Switch>
            <PrivateRoute isLoggedIn={isLoggedIn} path="/profile">
              <Profile
                currentUser={currentUser}
                weatherData={temp}
                clothingItems={clothingItems}
                allClothes={allClothes}
                handleCardClick={handleCardClick}
                handleLikeClick={handleLikeClick}
                openAddModal={() => {
                  setActiveModal("add");
                }}
                handleCreateModal={handleCreateModal}
                updateProfile={updateProfile}
                openEditModal={() => {
                  setActiveModal("update");
                }}
                onSelectCard={handleSelectedCard}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                isLoading={isLoading}
              />
            </PrivateRoute>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                handleLikeClick={handleLikeClick}
                isLoggedIn={isLoggedIn}
              />
            </Route>
          </Switch>
          <Footer className="profile__footer" />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "create"}
              type={"create"}
              onAddItem={handleAddItem}
              isLoading={isLoading}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "item"}
              type={"item"}
              card={selectedCard}
              handleDeleteItem={handleDeleteItem}
              handleDeleteClick={handleDeleteClick}
              isLoggedIn={isLoggedIn}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              isOpen={activeModal === "login"}
              type={"login"}
              onCloseModal={handleCloseModal}
              handleToggleModal={handleToggleModal}
              handleLogin={handleAuthorization}
              handleProfileUpdate={handleProfileUpdate}
              isLoading={isLoading}
            />
          )}

          {activeModal === "register" && (
            <RegisterModal
              isOpen={activeModal === "register"}
              type={"register"}
              onCloseModal={handleCloseModal}
              handleRegistration={handleRegistration}
              handleToggleModal={handleToggleModal}
              isLoading={isLoading}
            />
          )}

          {activeModal === "update" && (
            <EditProfileModal
              isOpen={activeModal === "update"}
              type={"update"}
              onCloseModal={handleCloseModal}
              currentUser={currentUser}
              handleProfileUpdate={handleProfileUpdate}
              isLoading={isLoading}
            />
          )}

          {activeModal === "confirm" && (
            <DeleteItemModal
              isOpen={activeModal === "confirm"}
              type={"confirm"}
              selectedCard={selectedCard}
              onCloseModal={handleCloseModal}
              currentUser={currentUser}
              handleDeleteItem={handleDeleteItem}
              isLoading={isLoading}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
