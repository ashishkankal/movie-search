import { getMovie } from "./requests";
import { setMovie, setMovieProperty } from "reducers/Movie";
import { addToMovieList, removeFromWatchedList } from "reducers/WatchedMovies";

export const fetchAndSetMovieDetails = (
  movieId,
  WatchedList = []
) => dispatch =>
  getMovie(movieId).then(res => {
    const { Response } = res.data;
    if (Response === "True") {
      const movieData = reformatData(res.data, WatchedList);
      dispatch(setMovie(movieData));
    } else {
      dispatch(setMovie({ ...res.data, searched: true }));
    }
  });

export const addToWatchedList = (Movie, callback) => dispatch => {
  dispatch(addToMovieList(Movie));
  dispatch(setMovieProperty({ isWatched: true }));
  //callback();
};
export const markedAsUnwatched = (Movie = {}, activeMovie = {}) => dispatch => {
  dispatch(removeFromWatchedList(Movie));
  if (Movie.Title === activeMovie.Title) {
    dispatch(setMovieProperty({ isWatched: false }));
  }
};

const isMovieWatched = (Movie = {}, WatchedMoviesData = []) => {
  let watched = false;
  WatchedMoviesData.forEach(
    item => (watched = watched || item.Title === Movie.Title)
  );
  return watched;
};
const getRTomato = (Ratings = []) => {
  const rTomato = Ratings.filter(i => i.Source === "Rotten Tomatoes");
  if (rTomato.length > 0) {
    return rTomato[0].Value;
  }
  return null;
};

const reformatData = (item = {}, WatchedMoviesData) => {
  let newData = {};
  newData = {
    Title: item.Title,
    Released: item.Released,
    Plot: item.Plot,
    Poster: item.Poster,
    imdbRating: item.imdbRating,
    rTomato: getRTomato(item.Ratings),
    isWatched: isMovieWatched(item, WatchedMoviesData),
    Response: item.Response
  };
  return newData;
};
