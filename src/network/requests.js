import axios from "axios";
//http://www.omdbapi.com/?t=b&apikey=aabca0d
const API_KEY = "aabca0d";
const BASE_URL = "http://www.omdbapi.com/";

export const getMovie = (name = "") =>
  axios.get(BASE_URL + "?t=" + name + "&apikey=" + API_KEY);

// window.check={
//   getMovie
// }
