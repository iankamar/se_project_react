import React from "react";

const currentTemperatureUnitContext = React.createContext({
  currentTemperateUnit: "",
  handleToggleSwitchChange: () => {},
});

export { currentTemperatureUnitContext };
