const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img
          src={item.link}
          className="card_image"
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className="card_name"> {item.name} </div>
    </div>
  );
};

export default ItemCard;
