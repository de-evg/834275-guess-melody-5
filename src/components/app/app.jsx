import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import {BrowserRouter, Switch, Route} from "react-router-dom";

const App = (props) => {
  const {errorsCount} = props;

  return (
    <BrowserRouter>
      <Route exact path="/">
        <WelcomeScreen errorsCount={errorsCount} />
      </Route>
      <Route exact path="/dev-artist">
      </Route>
      <Route exact path="/dev-genre">
      </Route>
      <Route exact path="/login">
      </Route>
      <Route exact path="/result">
      </Route>
      <Route exact path="/lose">
      </Route>
    </BrowserRouter>
    
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired
};

export default App;
