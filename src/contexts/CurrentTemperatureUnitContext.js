import React from "react";

/** A context having the value of the current choice of temperature unit */

const currentTemperatureUnitContext = React.createContext({
  currentTemperateUnit: "",
  handleToggleSwitchChange: () => {},
});

export { currentTemperatureUnitContext };
