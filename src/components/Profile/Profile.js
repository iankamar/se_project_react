import React, { useState } from "react";
import { defaultClothingItems } from "../../utils/Constants";
import "./Profile.css";
import ItemModal from "../ItemModal/ItemModal";
import SideBar from "./SideBar/SideBar";
/*import ClothesSection from "./ClothesSection/ClothesSection"; */
/*import AddItemModal from "../AddItemModal/AddItemModal";*/
import ItemCard from "../ItemCard/ItemCard";

const Profile = ({ handleAddClick, onSelectCard, clothingItems }) => {
  /*
  const [selectedCard, setSelectedCard] = useState(null);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const onSelectCard = (item) => {
    setSelectedCard(item);
  };

  const onClose = () => {
    setSelectedCard(null);
  };

  const handleAddItem = (newItem) => {
    console.log(newItem);
    newItem.preventDefault();
    setClothingItems((prevItems) => [...prevItems, newItem]);
  };

  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };

  const handleCloseAddItemModal = () => {
    setAddItemModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    setClothingItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };
*/
  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__wrapper">
          <SideBar />
          <div className="profile__items">
            <h4>Your items</h4>
            <button
              type="submit"
              onClick={() => handleAddClick("create")}
              className="profile__item"
            >
              {" "}
              + Add New{" "}
            </button>
          </div>
        </div>

        <div className="profile__itemSection">
          <div className="profile__sidebar">
            {/* Sidebar content goes here */}
          </div>
          <div className="profile__itemsCard">
            {clothingItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onSelectCard={onSelectCard}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
