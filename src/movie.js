const movieTitle = document.querySelector("#movie-title");
const movieRating = document.querySelector("#movie-rating");
const movieDescription = document.querySelector("#movie-description");
const moviePoster = document.querySelector("#movie-poster img");
const movieGenresList = document.querySelector("#movie-genres-list");
const relatedMoviesList = document.querySelector("#related-movies-list");

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

async function getRecommendedMovies() {
  const id = getMovieId();
  const response = await fetch(
    `${API}${RECOMMENDATIONS_ENDPOINT(id)}?${API_KEY_PARAM}`
  );
  const { results } = await response.json();

  if (results.length === 0) {
    const listItem = document.createElement("li");
    listItem.textContent = "No related movies found";
    listItem.style.fontSize = "14px";
    relatedMoviesList.appendChild(listItem);
    return;
  }

  results.forEach((movie) => {
    const listItem = createRelatedMovie(
      movie.poster_path,
      movie.title,
      movie.id
    );

    relatedMoviesList.appendChild(listItem);
  });
}

function createRelatedMovie(src, alt, id) {
  const listItem = document.createElement("li");
  const anchor = document.createElement("a");
  const image = document.createElement("img");

  image.src = `${IMAGES_API}${src}`;
  image.alt = alt;
  anchor.classList.add("related-movie");
  anchor.href = `../pages/movie.html?movie=${id}`;

  anchor.appendChild(image);
  listItem.appendChild(anchor);

  return listItem;
}

getMovie();
getRecommendedMovies();
