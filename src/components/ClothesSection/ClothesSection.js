import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { getItemList } from "./api";

function ClothesSection() {
  const currentUser = useContext(CurrentUserContext);
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getItemList()
        .then((allClothes) => {
          const userClothes = allClothes.filter(
            (clothing) => clothing.owner._id === currentUser?._id
          );
          setClothes(userClothes);
        })
        .catch((error) => console.error(error));
    }
  }, [currentUser]);

  return (
    <div className="clothes_section">
      {clothes.map((clothing) => (
        <div key={clothing._id} className="clothing-item">
          <img src={clothing.image} alt={clothing.name} />
          <h2>{clothing.name}</h2>
          <p>{clothing.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ClothesSection;
