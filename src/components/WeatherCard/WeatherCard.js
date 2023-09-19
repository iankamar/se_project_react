import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/Constants";
import "./WeatherCard.css";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.tempRange === type;
  });

  const imageSrcUrl = imageSrc.length > 0 ? imageSrc[0].url : "";

  return (
    <section className="weather" id="weather">
      <div className="weather_info">
        {weatherTemp.toFixed(0)} °{currentTemperatureUnit}{" "}
      </div>
      <img src={imageSrcUrl} className="weather_image" alt={type} />
    </section>
  );
};

export default WeatherCard;
