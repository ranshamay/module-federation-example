import App from "./components/App";
import React from "react";
import { hydrateRoot } from "react-dom/client";
import i18n from  "../server/localization/i18n"
import { initializeIcons } from "@fluentui/react";
import './index.css';


    initializeIcons();
    i18n();

    const container = document.getElementById("root");
    hydrateRoot(container, <App />);



