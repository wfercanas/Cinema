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
  const anchor = document.createElement("a");
  const image = document.createElement("img");

  image.src = `${IMAGES_API}${src}`;
  image.alt = alt;
  anchor.classList.add("trending-movie");
  anchor.href = "../pages/movie.html";

  anchor.appendChild(image);
  listItem.appendChild(anchor);

  return listItem;
}
