const InterModal = ({ selectedCard, onClose }) => {
  console.log("inter modal");

  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <img src={selectCard.link} />
        <div> {selectedCard.name}</div>
        <div>Weather type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default InterModal;
