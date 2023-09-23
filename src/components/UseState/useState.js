import React, { useState } from "react";

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

export function FormComponent() {
  const initialValues = { name: "" };
  const { values, handleChange } = UseForm(initialValues);

  return (
    <form>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
    </form>
  );
}
