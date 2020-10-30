import {isArtistAnswerCorrect, isGenreAnswerCorrect} from "../answer-checks";
import {GameType} from "../const";

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_GAME_STEP: `INCREMENT_GAME_STEP`,
  RESET_GAME: `RESET_GAME`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`
};

const checkIsAnswerCorrect = (question, userAnswer) => {
  let answerIsCorrect = false;

  switch (question.type) {
    case GameType.ARTIST:
      answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
      break;
    case GameType.GENRE:
      answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
      break;
  }
  return answerIsCorrect;
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_GAME_STEP
  }),
  resetGame: () => ({
    type: ActionType.RESET_GAME,
  }),
  incrementMistake: () => ({
    type: ActionType.INCREMENT_MISTAKES
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url
  })
};


export {ActionType, ActionCreator, checkIsAnswerCorrect};
