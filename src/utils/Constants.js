import sunnyDay from "../images/day/sunny.svg";
import cloudyDay from "../images/day/cloudy.svg";
import rain from "../images/day/rain.svg";
import storm from "../images/day/storm.svg";
import snow from "../images/day/snow.svg";
import fog from "../images/day/fog.svg";
import moon from "../images/night/moon.svg";
import cloudy from "../images/night/cloudy.svg";

export const weatherOptions = [
  /*Day*/

  {
    url: sunnyDay,
    day: true,
    type: "sunny",
    tempRange: "hot",
  },
  {
    url: cloudyDay,
    day: true,
    type: "cloudy",
    tempRange: "warm",
  },
  {
    url: rain,
    day: true,
    type: "rain",
    tempRange: "cold",
  },
  {
    url: storm,
    day: true,
    type: "storm",
    tempRange: "cold",
  },
  {
    url: snow,
    day: true,
    type: "snow",
    tempRange: "cold",
  },
  { url: fog, day: true, type: "fog" },

  /*Night*/

  {
    url: moon,
    day: false,
    type: "moon",
    tempRange: "hot",
  },
  {
    url: cloudy,
    day: false,
    type: "cloudy",
    tempRange: "warm",
  },
  {
    url: rain,
    day: false,
    type: "rain",
    tempRange: "cold",
  },
  {
    url: storm,
    day: false,
    type: "storm",
    tempRange: "cold",
  },
  {
    url: snow,
    day: false,
    type: "snow",
    tempRange: "cold",
  },
  {
    url: fog,
    day: false,
    type: "fog",
    tempRange: "cold",
  },
];

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];
