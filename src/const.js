const MAX_MISTAKE_COUNT = 3;
const INCREMENT_STEP = 1;
const GameType = {
  ARTIST: `artist`,
  GENRE: `genre`,
};

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const AppRoute = {
  LOGIN: `/login`,
  LOSE: `/lose`,
  RESULT: `/result`,
  ROOT: `/`,
  GAME: `/game`,
};

const APIRoute = {
  QUESTIONS: `/questions`,
  LOGIN: `/login`,
};

export {GameType, MAX_MISTAKE_COUNT, INCREMENT_STEP, AuthorizationStatus, AppRoute, APIRoute};
