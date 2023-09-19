import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperateUnit: "",
  handleToggleSwitchChange: () => {},
});

export { CurrentTemperatureUnitContext };
