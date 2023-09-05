const weatherOptions = [
  { url: require("../images/day/sunny.svg").default, day: true, type: "sunny" },
  {
    url: require("../images/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../images/night/rain.svg").default,
    day: true,
    type: "rain",
  },
  {
    url: require("../images/night/moon.svg").default,
    day: false,
    type: "moon",
  },
];

const WeatherCard = ({ day, type }) => {
  console.log("weather card");
  const imageSrc = weatherOptions.filter((i) => {
    console.log(i);
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc.length > 0 ? imageSrc[0].url : "";

  return (
    <section className="weather" id="weather">
      <div className="weather_info">75F</div>
      <img src={imageSrcUrl} className="weather_image" />
    </section>
  );
};

export default WeatherCard;
