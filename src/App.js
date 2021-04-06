import React from "react";
import { HashRouter as Router } from "react-router-dom";

import Header from "./vievs/Header/Header";
import MainSwitch from "./components/MainSwitch/MainSwitch";
import UpButton from "./components/Buttons/UpButton/UpButton";
import Footer from "./vievs/Footer/Footer";

import StoreProvider from "../src/Store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Header />
        <>
          <MainSwitch />
        </>
        <Footer />
        <UpButton />
      </Router>
    </StoreProvider>
  );
}

export default App;
