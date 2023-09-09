import sunnyDay from "../../images/day/sunny.svg";
import cloudyDay from "../../images/day/cloudy.svg";
import rain from "../../images/day/rain.svg";
import storm from "../../images/day/storm.svg";
import snow from "../../images/day/snow.svg";
import fog from "../../images/day/fog.svg";
import moon from "../../images/night/moon.svg";
import cloudy from "../../images/night/cloudy.svg";
import "./WeatherCard.css";
export const weatherOptions = [
  /*Day*/

  {
    url: sunnyDay,
    day: true,
    type: "sunny",
  },
  {
    url: cloudyDay,
    day: true,
    type: "cloudy",
  },
  {
    url: rain,
    day: true,
    type: "rain",
  },
  {
    url: storm,
    day: true,
    type: "storm",
  },
  {
    url: snow,
    day: true,
    type: "snow",
  },
  { url: fog, day: true, type: "fog" },

  /*Night*/

  {
    url: moon,
    day: false,
    type: "moon",
  },
  {
    url: cloudy,
    day: false,
    type: "cloudy",
  },
  {
    url: rain,
    day: false,
    type: "rain",
  },
  {
    url: storm,
    day: false,
    type: "storm",
  },
  {
    url: snow,
    day: false,
    type: "snow",
  },
  {
    url: fog,
    day: false,
    type: "fog",
  },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  console.log("weather card");
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc.length > 0 ? imageSrc[0].url : "";

  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp} °F </div>
      <img src={imageSrcUrl} className="weather_image" alt="ImageOfWeather" />
    </section>
  );
};

export default WeatherCard;
