// dark blue: #0c6ded
// light    : #7aecfc
import "./App.css";
import React from "react";
import Header from "./Components/Header.js";
import Search from "./Components/Search";
import { GlobalProvider } from "./GlobalContext";
import { ShowWeather } from "./Components/ShowWeather.js";
import { Footer } from "./Components/Footer";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Header></Header>
        <Search></Search>
        <ShowWeather></ShowWeather>
      </div>
      <Footer></Footer>
    </GlobalProvider>
  );
}

export default App;
