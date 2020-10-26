import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class GenreAnswer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  handleAnswerChange(evt) {
    const {onChange, id} = this.props;
    const value = evt.target.checked;
    onChange(id, value);
  }

  render() {
    const {answer, id, renderPlayer, userAnswer} = this.props;

    return (
      <div className="track">
        {renderPlayer(answer.src, id)}
        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${id}`}
            id={`answer-${id}`}
            checked={userAnswer}
            onChange={this.handleAnswerChange}
          />
          <label className="game__check" htmlFor={`answer-${id}`}>Отметить</label>
        </div>
      </div>
    );
  }
}

GenreAnswer.propTypes = {
  answer: PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswer: PropTypes.bool.isRequired,
};

export default GenreAnswer;
