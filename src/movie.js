const movieTitle = document.querySelector("#movie-title");
const movieRating = document.querySelector("#movie-rating");
const movieDescription = document.querySelector("#movie-description");
const moviePoster = document.querySelector("#movie-poster");
const movieGenresList = document.querySelector("#movie-genres-list");

function getMovieId() {
  const search = location.search;
  const searchSplit = search.split("=");
  const id = searchSplit[1];

  return id;
}

async function getMovie() {
  const id = getMovieId();
  const response = await fetch(`${API}${MOVIE_ENDPOINT(id)}?${API_KEY_PARAM}`);
  const data = await response.json();
  console.log(data);

  movieTitle.textContent = data.original_title;
  movieRating.textContent = data.vote_average;
  movieDescription.textContent = data.overview;
  moviePoster.src = `${IMAGES_API}${data.poster_path}`;

  data.genres.forEach((genre) => createMovieGenre(genre.name));
}

function createMovieGenre(genre) {
  const item = document.createElement("li");
  item.textContent = genre;
  item.classList.add("movie-genre");

  movieGenresList.appendChild(item);
}

getMovie();
