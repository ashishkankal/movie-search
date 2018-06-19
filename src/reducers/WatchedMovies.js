export const SET_MOVIE_LIST = "setMovieList";
export const CLEAR_MOVIE_LIST = "clearMovieList";
export const ADD_MOVIE_LIST = "addMovieList";
export const REMOVE_WATCHED_MOVIE = "removeFromWatched";

const WatchedMoviesList = (state = [], { type, payload }) => {
  switch (type) {
    case SET_MOVIE_LIST:
      return payload;
      case ADD_MOVIE_LIST:
      {
        const isPresent = state.filter(i=>i.Title===payload[0].Title);
        if(isPresent.length>0){
          return state;
        }
        return [...state,...payload];

      }
      case REMOVE_WATCHED_MOVIE:{
        const UpdatedList = state.filter(i=>i.Title!==payload.Title)
        return UpdatedList;

      }
    case CLEAR_MOVIE_LIST:
      return [];
    default:
      return state;
  }
};

export default WatchedMoviesList;

export const setMovieList = list => ({
  type: SET_MOVIE_LIST,
  payload: list
});
export const addToMovieList = list => ({
    type: ADD_MOVIE_LIST,
    payload: list
  });

  export const removeFromWatchedList=list=>({
    type: REMOVE_WATCHED_MOVIE,
    payload: list
  })
export const clearMovieList = () => ({
  type: CLEAR_MOVIE_LIST
});
