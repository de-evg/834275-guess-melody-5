import React from "react";
import {render} from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extensions";
import {Provider} from "react-redux";
import thunk from "redux-think";
import {createAPI} from "./services/api";
import App from "./components/app/app";
import {reducer} from "./store/reducer";
import {requireAuthorization} from "./store/action";
import {fetchQuestionList, checkAuth} from "./store/api-actions";
import {AuthorizationStatus} from "./const";
import {redirect} from "./store/middlewares/redirect";


const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

store.dispatch(fetch(fetchQuestionList()));
store.dispatch(checkAuth());

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
