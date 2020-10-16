import PropTypes from "prop-types";
import {GameType} from "../../const";

const genreQuestionProp = PropTypes.shape({
  answers: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  genre: PropTypes.string.isRequired,
  type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
}).isRequired;

export default genreQuestionProp;
