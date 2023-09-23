import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function isDaytime() {
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18;
}

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  let temp =
    typeof weatherTemp === "number"
      ? weatherTemp
      : weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  temp = currentTemperatureUnit === "F" ? temp : ((temp - 32) * 5) / 9;

  const weatherType = useMemo(() => {
    if (currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 60 && weatherTemp <= 85) {
        return "warm";
      } else if (temp <= 60) {
        return "cold";
      }
    } else if (currentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 15 && temp <= 29) {
        return "warm";
      } else if (temp <= 15) {
        return "cold";
      }
    }
  }, [temp, currentTemperatureUnit]);

  const filteredCards = clothingItems.filter((item) => {
    return item.weather ? item.weather.toLowerCase() === weatherType : false;
  });

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
            <ItemCard key={index} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
