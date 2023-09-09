const ItemModal = ({ selectedCard, onClose }) => {
  console.log("item modal");

  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <img src={selectedCard.link} alt="SelectedCard" />
        <h3> {selectedCard.name}</h3>
        <div>Weather type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default ItemModal;
