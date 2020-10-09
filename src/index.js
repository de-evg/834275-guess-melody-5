import React from "react";
import {render} from "react-dom";
import App from "./components/app/app";
import questions from "./mocks/questions";

const Settings = {
  ERRORS_COUNT: 3
};

render(
    <App
      errorsCount={Settings.ERRORS_COUNT}
      questions={questions}
    />,
    document.getElementById(`root`)
);
