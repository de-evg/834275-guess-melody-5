import {isArtistAnswerCorrect, isGenreAnswerCorrect} from "../answer-checks";
import {GameType} from "../const";

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_GAME_STEP: `INCREMENT_GAME_STEP`,
  RESET_GAME: `RESET_GAME`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`
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

const incrementStep = () => ({
  type: ActionType.INCREMENT_GAME_STEP
});

const resetGame = () => ({
  type: ActionType.RESET_GAME,
});

const incrementMistake = () => ({
  type: ActionType.INCREMENT_MISTAKES
});

const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status
});

const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url
});

const loadQuestions = (questions) => ({
  type: ActionType.LOAD_QUESTIONS,
  payload: questions
});

export {ActionType, incrementStep, resetGame, incrementMistake, requireAuthorization, redirectToRoute, loadQuestions, checkIsAnswerCorrect};
