import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import {GameType} from "../../const";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import withAudioPlayer from "../../hocks/with-audio-player/with-audio-player";


const ArtistQuestionScreenHOC = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenHOC = withAudioPlayer(GenreQuestionScreen);

const GameScreen = (props) => {
  const {questions, step, onUserAnswer, resetGame} = props;
  const question = questions[step];


  if (step >= questions.length || !question) {
    resetGame();
    return (
      <Redirect to="/" />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreenHOC
          question={question}
          onAnswer={onUserAnswer}
        />
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreenHOC
          question={question}
          onAnswer={onUserAnswer}
        />
      );
  }

  return <Redirect to="/" />;
};

const mapStateToProps = (state) => ({
  step: state.step
});

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
  onUserAnswer() {
    dispatch(ActionCreator.incrementStep());
  }
});

GameScreen.propTypes = {
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
};

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
