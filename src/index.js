import React from "react";
import ReactDOM from "react-dom";
import "./Root/index.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const rootElement = document.getElementById("root");

if (rootElement) {
	ReactDOM.render(<App />, rootElement);
}

serviceWorkerRegistration.register();
