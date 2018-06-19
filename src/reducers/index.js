import { combineReducers } from "redux";
import LikedDislikedMovies from "./LikedDislikedMovies";
import Movie from "./Movie";
import WatchedMovies from "./WatchedMovies";
const rootReducer = combineReducers({
  LikedDislikedMovies,
  Movie,
  WatchedMovies
});
export default rootReducer;
