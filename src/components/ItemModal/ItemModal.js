const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button type="button" onClick={onClose} className="modal__close">
          &#x2715;
        </button>
        <img src={selectedCard.link} alt={selectedCard.name} />
        <div className="modal__align">
          <h3> {selectedCard.name}</h3>
          <button type="button" className="modal__delete" onClick={onClose}>
            Delete item
          </button>
        </div>
        <div>Weather type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default ItemModal;
