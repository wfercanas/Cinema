const API = "https://api.themoviedb.org/3";
const IMAGES_API = "https://image.tmdb.org/t/p/w500";
const API_KEY_PARAM = `api_key=${API_KEY}`;
const GENRES_ENDPOINT = "/genre/movie/list";

const TRENDING_ENDPOINT = (media_type, time_window) => {
  return `/trending/${media_type}/${time_window}`;
};

const MOVIE_ENDPOINT = (movie_id) => {
  return `/movie/${movie_id}`;
};
