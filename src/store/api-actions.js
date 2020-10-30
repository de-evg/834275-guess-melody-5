import {ActionCreator} from "./action";
import {AuthorizationStatus} from "../const";

const fetchQuestionList = () => (dispatch, _getState, api) => (
  api.get(`/questions`)
    .then(({data}) => dispatch(ActionCreator.loadQuestions(data)))
);

const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch((err) => {
      throw err;
    })
);

const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(()=> dispatch(ActionCreator.redirectToRoute(`/game`)))
);

export {fetchQuestionList, checkAuth, login};
