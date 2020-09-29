import React from "react";
import {render} from "react-dom";
import App from "./components/app/app";

const Settings = {
  ERRORS_COUNT: 3
};

render(
    <App errorsCount={Settings.ERRORS_COUNT} />,
    document.getElementById(`root`)
);
