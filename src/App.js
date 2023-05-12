import "./App.css";
import "./index.css";
import Login from "./components/common/login/Login";
import Register from "./components/common/register/Register";
import Home from "./components/pages/home/Home";

import {  Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/home" element={<Home />} /> 
        </Routes>
    </div>
  );
}

export default App;
