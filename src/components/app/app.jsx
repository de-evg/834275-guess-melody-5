import React from "react";
import {Router as BrowserRouter, Switch, Route} from "react-router-dom";
import browserHistory from "../../browser-history";

import WelcomeScreen from "../welcome-screen/welcome-screen";
import AuthScreen from "../auth-screen/auth-screen";
import WinScreen from "../win-screen/win-screen";
import GameOverScreen from "../game-over-screen/game-over-screen";
import GameScreen from "../game-screen/game-screen";
import PrivateRoute from "../private-route/private-route";

import {MAX_MISTAKE_COUNT, AppRoute} from "../../const";

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact
          path={AppRoute.ROOT}
          render={({history}) => (
            <WelcomeScreen
              onPlayButtonClick={() => history.push(AppRoute.GAME)}
              errorsCount={MAX_MISTAKE_COUNT}
            />
          )}
        />

        <Route exact
          path={AppRoute.LOGIN}
          render={({history}) => (
            <AuthScreen
              onReplayButtonClick={() => history.push(AppRoute.GAME)}
            />
          )}
        />

        <PrivateRoute
          exact
          path={AppRoute.RESULT}
          render={({history}) => (
            <WinScreen
              onReplayButtonClick={() => history.push(AppRoute.GAME)}
            />
          )}
        />

        <Route exact
          path={AppRoute.LOSE}
          render={({history}) => (
            <GameOverScreen
              onReplayButtonClick={() => history.push(AppRoute.GAME)}
            />
          )}
        />

        <Route
          exact
          path={AppRoute.GAME}
        >
          <GameScreen
            errorsCount={MAX_MISTAKE_COUNT}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;
