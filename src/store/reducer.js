import {extend} from "../utils/utils";
import {ActionType} from "./action";
import questions from "../mocks/questions";
import {MAX_MISTAKE_COUNT, INCREMENT_STEP} from "../const";

const initialState = {
  mistakes: 0,
  step: 0,
  questions
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_GAME_STEP:
      let nextStep = state.step + INCREMENT_STEP;

      return extend(state, {
        step: nextStep
      });

    case ActionType.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + INCREMENT_STEP;

      if (mistakes >= MAX_MISTAKE_COUNT) {
        return extend(state, initialState);
      }

      return extend(state, {
        mistakes
      });
    case ActionType.RESET_GAME:
      return extend(state, initialState);
  }
  return state;
};

export {reducer};
