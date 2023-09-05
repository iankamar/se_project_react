import logo from "./logo.svg";
import Header from "./Header/Header";
import WeatherCard from "./WeatherCard/WeatherCard";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <WeatherCard day={true} type="rain" />
        <section id="card-section">card Section</section>
      </main>
    </div>
  );
}

export default App;
