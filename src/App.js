import React from "react";
import { HashRouter as Router } from "react-router-dom";

import Header from "./vievs/Header/Header";
import MainSwitch from "./components/MainSwitch/MainSwitch";
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
      </Router>
      <Footer />
    </StoreProvider>
  );
}

export default App;
