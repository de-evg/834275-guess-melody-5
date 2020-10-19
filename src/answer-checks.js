const isArtistAnswerCorrect = (question, userAnswer) => userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (question, userAnswer) => userAnswer.every((it, i) => it === (question.answers[i].genre === question.genre));

export {isArtistAnswerCorrect, isGenreAnswerCorrect};
