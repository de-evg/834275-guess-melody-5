import React from "react";
import {render} from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import App from "./components/app/app";
import rootReducer from "./store/reducers/root-reducer";
import {requireAuthorization} from "./store/action";
import {fetchQuestionList} from "./store/api-actions";
import {AuthorizationStatus} from "./const";
import {redirect} from "./store/middlewares/redirect";


const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

Promise.all([
  store.dispatch(fetchQuestionList())
])
  .then(() => {
    render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.querySelector(`#root`)
    );
  });
