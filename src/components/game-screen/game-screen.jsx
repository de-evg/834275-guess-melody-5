import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {resetGame, incrementStep, incrementMistake, checkIsAnswerCorrect} from "../../store/action";
import {GameType, MAX_MISTAKE_COUNT, AppRoute} from "../../const";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import Mistakes from "../mistakes/mistakes";

import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";

import artistQuestionProp from "../artist-question-screen/artist-question.prop";
import genreQuestionProp from "../genre-question-screen/genre-question.prop";

const ArtistQuestionScreenHOC = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenHOC = withAudioPlayer(withUserAnswer(GenreQuestionScreen));

const GameScreen = ({questions, step, onUserAnswer, mistakes}) => {
  const question = questions[step];

  if (mistakes >= MAX_MISTAKE_COUNT) {
    return (
      <Redirect to={AppRoute.LOSE} />
    );
  }

  if (step >= questions.length || !question) {
    return (
      <Redirect to={AppRoute.RESULT} />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreenHOC
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes}/>
        </ArtistQuestionScreenHOC>
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreenHOC
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes}/>
        </GenreQuestionScreenHOC>
      );
  }

  return <Redirect to={AppRoute.ROOT} />;
};

const mapStateToProps = ({GAME, DATA}) => ({
  step: GAME.step,
  mistakes: GAME.mistakes,
  questions: DATA.questions,
});

const mapDispatchToProps = (dispatch) => ({
  resetGameActoion() {
    dispatch(resetGame());
  },
  onUserAnswer(question, answer) {
    if (checkIsAnswerCorrect(question, answer)) {
      dispatch(incrementStep());
    } else {
      dispatch(incrementStep());
      dispatch(incrementMistake());
    }
  }
});

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([artistQuestionProp, genreQuestionProp]).isRequired
  ),
  step: PropTypes.number.isRequired,
  resetGameActoion: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired
};

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
