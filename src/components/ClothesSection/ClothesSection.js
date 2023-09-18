import React from "react";

const ClothingSection = ({ clothes }) => {
  console.log(clothes);
  return (
    <div className="clothes__section">
      {clothes.map((item) => (
        <div key={item._id} className="clothes__items">
          <img src={item.imageUrl} alt={item.name} />
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default ClothingSection;
