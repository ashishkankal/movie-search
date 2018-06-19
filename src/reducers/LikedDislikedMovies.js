export const SET_LIKE_DISLIKE_MOVIE_LIST = "setLikeDislikeMovie";
export const CLEAR_LIKE_DISLIKE_MOVIE_LIST = "clearLikeDislikMovie";

const LikedDislikedMovies = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_LIKE_DISLIKE_MOVIE_LIST:
      return { ...state, ...payload };
    case CLEAR_LIKE_DISLIKE_MOVIE_LIST:
      return {};
    default:
      return state;
  }
};

export default LikedDislikedMovies;

export const setLikeDislikeMovie = item => ({
  type: SET_LIKE_DISLIKE_MOVIE_LIST,
  payload: item
});

export const clearLikeDislikeMovie = () => ({
  type: CLEAR_LIKE_DISLIKE_MOVIE_LIST
});
