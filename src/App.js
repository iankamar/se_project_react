import logo from "./logo.svg";
import Header from "./Header/Header";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import Main from "./Main/Main";
import Footer from "./footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import "./App.css";

function App() {
  const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={weatherTemp} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment">
          <label>
            Name
            <input type="text" name="name" minLength="1" maxLength="30" />
          </label>
          <label>
            Image
            <input type="url" name="link" minLength="1" maxLength="30" />
          </label>
          <p> Select the weather type:</p>
          <div>
            <div>
              <input type="radio" id="hot" value="hot" />
              <lable>Hot</lable>
            </div>
            <div>
              <input type="radio" id="warm" value="warm" />
              <lable>Warm</lable>
            </div>
            <div>
              <input type="radio" id="cold" value="cold" />
              <lable>Cold</lable>
            </div>
          </div>
        </ModalWithForm>
      )}
    </div>
  );
}

export default App;
