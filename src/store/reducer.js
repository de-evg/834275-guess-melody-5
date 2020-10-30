import {extend} from "../utils/utils";
import {ActionType} from "./action";
import {INCREMENT_STEP} from "../const";

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
      return extend(state, {
        mistakes: state.mistakes + INCREMENT_STEP
      });
    case ActionType.RESET_GAME:
      return extend(state, initialState);
  }
  return state;
};

export {reducer};
