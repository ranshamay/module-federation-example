import App from "./components/App";
import React from "react";
import { hydrateRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = hydrateRoot(container, <App />);
