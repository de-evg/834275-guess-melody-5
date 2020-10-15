import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";
import AudioPlayer from "../audio-player/audio-player";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);

    this.state = {
      acitvePlayer: 0,
      answers: [false, false, false, false]
    };
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    this.props.onAnswer(this.props.question, this.state.answers);
  }

  handleAnswerChange(evt) {
    const value = evt.target.checked;
    const i = +evt.target.id.slice(-1);
    this.setState({
      answers: [...this.state.answers.slice(0, i), value, ...this.state.answers.slice(i + 1)],
    });
  }

  handlePlayButtonClick(evt) {
    const playerID = evt.target
    this.setState({
      acitvePlayer: this.state.acitvePlayer === playerID ? -1 : playerID
    });
  }

  render() {
    const {answers: userAnswers, acitvePlayer} = this.state;
    const {answers, genre} = this.props.question;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
          </svg>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={this.handleFormSubmit}
          >
            {answers.map((answer, i) => (
              <div key={`${i}-${answer.src}`} className="track">
                <button className="track__button track__button--play" type="button"/>
                <AudioPlayer
                  id={i}
                  isPlaying={i === 0}
                  src={answer.src}
                  onClick={this.handlePlayButtonClick}
                />
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`}
                    id={`answer-${i}`}
                    checked={userAnswers[i]}
                    onChange={this.handleAnswerChange}
                  />
                  <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
                </div>
              </div>
            ))}

            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
};
export default GenreQuestionScreen;
