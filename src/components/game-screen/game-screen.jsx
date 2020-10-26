import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator, checkIsAnswerCorrect} from "../../store/action";
import {GameType, MAX_MISTAKE_COUNT} from "../../const";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import Mistakes from "../mistakes/mistakes";

import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";

import artistQuestionProp from "../artist-question-screen/artist-question.prop";
import genreQuestionProp from "../genre-question-screen/genre-question.prop";

const ArtistQuestionScreenHOC = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenHOC = withAudioPlayer(withUserAnswer(GenreQuestionScreen));

const GameScreen = (props) => {
  const {questions, step, onUserAnswer, mistakes} = props;
  const question = questions[step];


  if (mistakes >= MAX_MISTAKE_COUNT) {
    return (
      <Redirect to="/lose" />
    );
  }

  if (step >= questions.length || !question) {
    return (
      <Redirect to="/result" />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreenHOC
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes}/>
        </ArtistQuestionScreenHOC>
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreenHOC
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes}/>
        </GenreQuestionScreenHOC>
      );
  }

  return <Redirect to="/" />;
};

const mapStateToProps = (state) => ({
  step: state.step,
  mistakes: state.mistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
  onUserAnswer(question, answer) {
    if (checkIsAnswerCorrect(question, answer)) {
      dispatch(ActionCreator.incrementStep());
    } else {
      dispatch(ActionCreator.incrementStep());
      dispatch(ActionCreator.incrementMistake());
    }
  }
});

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([artistQuestionProp, genreQuestionProp]).isRequired
  ),
  step: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired
};

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
