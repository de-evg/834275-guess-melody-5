import React from "react";

const GenreAnswer = (props) => {
  const {src, renderPlayer, i, isChecked, onAnswerChange} = props;

  const handleAnswerChange = (evt) => {
    evt.preventDefault();
    const value = evt.target.checked;
    const id = +evt.target.id.slice(-1);
    onAnswerChange(value, id);
  };

  return (
    <div className="track">
      {renderPlayer(src, i)}
      <div className="game__answer">
        <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`}
          id={`answer-${i}`}
          checked={isChecked}
          onChange={handleAnswerChange}
        />
        <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
      </div>
    </div>
  );
};

export default GenreAnswer;
