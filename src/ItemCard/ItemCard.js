const ItemCard = ({ item, OnSelectCard }) => {
  return (
    <div>
      <div>
        <img src={item.link} className="card_image" onClick={onSelectCard} />
      </div>
      <div className="card_name"> {item.name} </div>
    </div>
  );
};

export default ItemCard;
