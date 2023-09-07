import { defaultClothingItems } from "../utils/Constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherTemp }) {
  return (
    <main className="main">
      <WeatherCard day={false} type="rain" weatherTemp={weatherTemp} />
      <section className="card_section" id="card-section">
        Today is {weatherTemp} / You may want to wear:
        <div className="card_items">
          {defaultClothingItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
