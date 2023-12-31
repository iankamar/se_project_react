import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Main.css";

function isDaytime() {
  const currentHour = new Date().getHours();
  return currentHour >= 7 && currentHour < 17;
}

function Main({
  weatherTemp,
  onSelectCard,
  clothingItems,
  handleCardClick,
  handleLikeClick,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  let temp =
    typeof weatherTemp === "number"
      ? weatherTemp
      : weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  temp = currentTemperatureUnit === "F" ? temp : ((temp - 32) * 5) / 9;

  const weatherType = useMemo(() => {
    if (currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 50 && temp <= 85) {
        return "warm";
      } else if (temp <= 50) {
        return "cold";
      }
    } else if (currentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 10 && temp <= 29) {
        return "warm";
      } else if (temp <= 10) {
        return "cold";
      }
    }
  }, [temp, currentTemperatureUnit]);

  const filteredCards = clothingItems.filter(
    (item) => item.weather && item.weather.toLowerCase() === weatherType
  );

  return (
    <main className="main">
      <WeatherCard
        day={isDaytime()}
        type={weatherType}
        weatherTemp={temp}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="card_section" id="card-section">
        Today is {temp.toFixed(0)} °{currentTemperatureUnit} / You may want to
        wear:
        <div className="card_items">
          {filteredCards.map((item, index) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectCard={onSelectCard}
              isOpen="false"
              clothingOption={item}
              handleCardClick={() => handleCardClick(item)}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              handleLikeClick={() => {
                handleLikeClick(
                  item._id,
                  item.likes?.includes(currentUser._id),
                  currentUser
                );
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
