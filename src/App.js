import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import Header from "./components/common/header/Header";
import Home from "./components/pages/home/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
