import {extend} from "../utils/utils";
import {ActionType} from "./action";

const initialState = {
  mistakes: 0,
  step: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        step: state.mistakes + action.payload
      });
  }
  return state;
};

export {reducer};
