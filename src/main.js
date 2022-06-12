const API = "https://api.themoviedb.org/3";
const IMAGES_API = "https://image.tmdb.org/t/p/w500";
const API_KEY_PARAM = `api_key=${API_KEY}`;
const GENRES_ENDPOINT = "/genre/movie/list";

const TRENDING_ENDPOINT = (media_type, time_window) => {
  return `/trending/${media_type}/${time_window}`;
};

async function getGenres() {
  const response = await fetch(`${API}${GENRES_ENDPOINT}?${API_KEY_PARAM}`);
  const { genres } = await response.json();

  const genresList = document.querySelector("#genres ul");
  genres.forEach((genre) => {
    const item = createGenre(genre.name);
    appendToTarget(genresList, item);
  });
}

function createGenre(name) {
  const listItem = document.createElement("li");
  listItem.textContent = name;

  return listItem;
}

function appendToTarget(target, element) {
  target.appendChild(element);
}

async function getTrending() {
  const response = await fetch(
    `${API}${TRENDING_ENDPOINT("movie", "day")}?${API_KEY_PARAM}`
  );
  const { results } = await response.json();

  const trendingList = document.querySelector("#trending ul");
  results.forEach((movie) => {
    const item = createTrendingMovie(movie.poster_path, movie.title);
    appendToTarget(trendingList, item);
  });
}

function createTrendingMovie(src, alt) {
  const listItem = document.createElement("li");
  const article = document.createElement("article");
  const image = document.createElement("img");

  image.src = `${IMAGES_API}${src}`;
  image.alt = alt;
  article.classList.add("trending-movie");

  article.appendChild(image);
  listItem.appendChild(article);

  return listItem;
}

getGenres();
getTrending();
