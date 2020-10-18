import {isArtistAnswerCorrect, isGenreAnswerCorrect} from "../answer-checks";
import {GameType} from "../const";

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_GAME: `RESET_GAME`
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
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),
  resetGame: () => ({
    type: ActionType.RESET_GAME,
  }),
  incrementMistake: () => {
    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    };
  },
};


export {ActionType, ActionCreator, checkIsAnswerCorrect};
