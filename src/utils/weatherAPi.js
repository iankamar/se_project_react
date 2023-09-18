// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}//

const latitude = 44.34;
const longitude = 10.99;
const APIkey = "37fd47fdc6ac7caa0dde7c4c82f0be18";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  /*console.log(Math.ceil(temperature));*/
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((data.main.temp - 32) * 5) / 9),
    },
  };
  /*console.log(weather);*/
  return Math.ceil(temperature);
};
