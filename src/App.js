import StoreProvider from "../src/Store/StoreProvider";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./vievs/Header/Header";
import MainSwitch from "./components/MainSwitch/MainSwitch";
import Footer from "./vievs/Footer/Footer";

function App() {
  return (
    <StoreProvider>
      <Router>
        <>
          <Header />
          <MainSwitch />
          <Footer />
        </>
      </Router>
    </StoreProvider>
  );
}

export default App;
