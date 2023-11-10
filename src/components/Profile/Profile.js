import React, { useState, useEffect } from "react";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
import ItemModal from "../ItemModal/ItemModal";
import { removeItem } from "../../utils/api";

const Profile = ({
  onSelectCard,
  handleCreateModal,
  clothingItems,
  updateProfile,
  handleLogout,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [/*isLoading,*/ setIsLoading] = React.useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setActiveModal(null);
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm");
  };

  const handleDeleteItem = (selectedCard) => {
    removeItem(selectedCard._id)
      .then((res) => {
        const deleteId = selectedCard._id;

        const updateItems = setSelectedCard.filter((item) => {
          return item._id !== deleteId;
        });

        setSelectedCard(updateItems);

        handleCloseModal();
      })

      .catch((err) => {
        console.error("Error deleting item:", err);
      })

      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
    const handleClickClose = (e) => {
      if (e.target.classList.contains("modal__close")) {
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleClickClose);

    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, [activeModal]);

  useEffect(() => {
    function handleOverlay(evt) {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("item-modal") ||
        evt.target.classList.contains("confirm-modal")
      ) {
        handleCloseModal();
      }
    }
    document.addEventListener("click", handleOverlay);
    return () => document.removeEventListener("click", handleOverlay);
  }, []);

  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__wrapper">
          <SideBar updateProfile={updateProfile} handleLogout={handleLogout} />
          <div className="profile__items">
            <h4>Your items</h4>
            <button
              type="submit"
              onClick={() => handleCreateModal("create")}
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
          <ClothesSection
            clothingItems={clothingItems}
            onSelectCard={handleCardClick}
            // onClick={() => handleCardClick(item)}
          />
        </div>
      </div>
      {selectedCard && activeModal === "item" ? (
        <ItemModal
          selectedCard={selectedCard}
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "item"}
          type={"item"}
          card={selectedCard}
          handleDeleteItem={handleDeleteItem}
          handleDeleteClick={handleDeleteClick}
        />
      ) : null}
    </div>
  );
};

export default Profile;
