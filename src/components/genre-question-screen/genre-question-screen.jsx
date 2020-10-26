import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import genreQuestionProp from "./genre-question.prop";
import GenreAnswer from "../genre-answer/genre-answer";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);

    this.state = {
      answers: [false, false, false, false]
    };
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    this.props.onAnswer(this.props.question, this.state.answers);
  }

  handleAnswerChange(value, i) {
    this.setState({
      answers: [...this.state.answers.slice(0, i), value, ...this.state.answers.slice(i + 1)],
    });
  }

  render() {
    const {answers: userAnswers} = this.state;
    const {question, renderPlayer, children} = this.props;
    const {answers, genre} = question;

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

          {children}
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={this.handleFormSubmit}
          >
            {answers.map((answer, i) => (
              <GenreAnswer
                i={i}
                key={`${i}-${answer.src}`}
                src={answer.src}
                isChecked={userAnswers[i]}
                renderPlayer={renderPlayer}
                onAnswerChange={this.handleAnswerChange}
              />
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
  question: genreQuestionProp,
  renderPlayer: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
export default GenreQuestionScreen;
