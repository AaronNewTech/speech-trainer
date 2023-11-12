import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
// import ReactDOM from "react-dom/client"; // Import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom";
// import UseContext from "./components/UseContext";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <LoginProvider> */}
    <App />
    {/* </LoginProvider > */}
  </BrowserRouter>
  // </React.StrictMode>
);
