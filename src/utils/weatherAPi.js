// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}//

import { request } from "../utils/api";
// import { handleServerResponse } from "../utils/api";

const latitude = 38.93;
const longitude = -77.18;
const APIkey = "37fd47fdc6ac7caa0dde7c4c82f0be18";

export const getForecastWeather = () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  return request(url).then((data) => {
    const cityName = data.name;
    data.cityName = cityName;
    return data;
  });
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((data.main.temp - 32) * 5) / 9),
    },
  };
  return Math.ceil(temperature);
};
