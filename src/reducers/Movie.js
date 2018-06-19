export const SET_MOVIE = "setMovie";
export const CLEAR_MOVIE = "clearMovie";
export const SET_MOVIE_PROPERTY = "setMovieProperty";
const Movie = (
  state = {
    Response: false,
    Error: "Search Movies from the search box",
    searched: false
  },
  { type, payload }
) => {
  switch (type) {
    case SET_MOVIE:
      return payload;
    case SET_MOVIE_PROPERTY:
      return { ...state, ...payload };
    case CLEAR_MOVIE:
      return [];
    default:
      return state;
  }
};

export default Movie;

export const setMovie = list => ({
  type: SET_MOVIE,
  payload: list
});

export const setMovieProperty = list => ({
  type: SET_MOVIE_PROPERTY,
  payload: list
});

export const clearMovie = () => ({
  type: CLEAR_MOVIE
});
