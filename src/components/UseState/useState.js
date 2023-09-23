import { useState } from "react";

export function UseForm(initialValues) {
  const [name, setName] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setName({
      ...name,
      [name]: value,
    });
  };

  return { name, handleChange, setName };
}
