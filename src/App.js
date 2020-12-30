// dark blue: #0c6ded
// light    : #7aecfc
import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Components/Header.js";
import Search from "./Components/Search";
import { GlobalProvider } from "./GlobalContext";
import { ShowWeather } from "./Components/ShowWeather.js";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Header></Header>
        <Search></Search>
        <ShowWeather></ShowWeather>
      </div>
    </GlobalProvider>
  );
}

export default App;
