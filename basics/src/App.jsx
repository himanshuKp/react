import "./App.css";
import MainContent from "./components/MainContent";
import NavBar from "./components/NavBar";
import DesertList from "./components/renderLists/DesertList";
import RestaurantMenu from "./components/renderLists/RestaurantMenu";
import ShoppingCart from "./components/ShoppingCart";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return <ShoppingCart />;
}

export default App;
