import Home from "./pages/Home/Home";
import LTScrollToTop from "./components/Layout/LTScrollToTop/LTScrollToTop";
import "./styles/App.css";

function App() {
  return (
    <div className="lt-app">
      <Home />
      <LTScrollToTop />
    </div>
  );
}

export default App;
