import React, { useContext } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection(allClothes) {
  const currentUser = useContext(CurrentUserContext);
  const clothes = allClothes.filter(
    (clothing) => clothing.owner._id === currentUser?._id
  );

  return (
    <div className="clothes_section">
      {clothes.map((clothing) => (
        <ItemCard key={clothing._id} item={clothing} />
      ))}
    </div>
  );
}

export default ClothesSection;
