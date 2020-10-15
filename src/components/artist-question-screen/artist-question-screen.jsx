import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import artistQuestionProp from "./artist-question.prop";

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  handleAnswerChange(evt) {
    evt.preventDefault();
    this.props.onAnswer(this.props.question, this.props.question.answers);
  }

  render() {
    const {question, renderPlayer} = this.props;
    const {answers, song} = question;

    return (
      <section className="game game--artist">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformrigin: `center`}} />
          </svg>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              {renderPlayer(song.src, 0)}
            </div>
          </div>

          <form className="game__artist">
            {answers.map((answer, i) => (
              <div key={answer.artist} className="artist">
                <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${i}`} id={`answer-${i}`}
                  onChange={this.handleAnswerChange}
                />
                <label className="artist__name" htmlFor={`answer-${i}`}>
                  <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                  {answer.artist}
                </label>
              </div>
            ))}
          </form>
        </section>
      </section>
    );
  }
}

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: artistQuestionProp,
  renderPlayer: PropTypes.func.isRequired
};

export default ArtistQuestionScreen;
