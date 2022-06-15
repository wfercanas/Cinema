const genresList = document.querySelector("#genres ul");
const trendingList = document.querySelector("#trending ul");

function appendToTarget(target, element) {
  target.appendChild(element);
}

async function getGenres() {
  const response = await fetch(`${API}${GENRES_ENDPOINT}?${API_KEY_PARAM}`);
  const { genres } = await response.json();

  const allItem = createGenre("All");
  allItem.classList.add("active");
  appendToTarget(genresList, allItem);

  genres.forEach((genre) => {
    const item = createGenre(genre.name, genre.id);
    appendToTarget(genresList, item);
  });
}

function createGenre(name, id) {
  const listItem = document.createElement("li");
  listItem.textContent = name;
  listItem.setAttribute("genre_id", id);
  listItem.addEventListener("click", reorderGenres);

  return listItem;
}

function reorderGenres({ target }) {
  const currentActive = document.querySelector(".active");
  currentActive.classList.remove("active");
  console.log(target, currentActive);
  target.classList.add("active");

  if (genresList.firstChild.textContent !== "All") {
    genresList.appendChild(genresList.firstChild);
  }
  genresList.insertBefore(target, genresList.firstChild);

  clearTrending();

  if (target.textContent === "All") {
    getAllTrending();
    return;
  }

  getGenreTrending(target.getAttribute("genre_id"));
}

function clearTrending() {
  trendingList.innerHTML = "";
}

async function getAllTrending() {
  const response = await fetch(
    `${API}${TRENDING_ENDPOINT("movie", "day")}?${API_KEY_PARAM}`
  );
  const { results } = await response.json();

  results.forEach((movie) => {
    const item = createTrendingMovie(movie.poster_path, movie.title, movie.id);
    appendToTarget(trendingList, item);
  });
}

async function getGenreTrending(genre_id) {
  const response = await fetch(
    `${API}${GENRE_MOVIES_ENDPOINT}?with_genres=${genre_id}&${API_KEY_PARAM}`
  );
  const { results } = await response.json();

  results.forEach((movie) => {
    const item = createTrendingMovie(movie.poster_path, movie.title, movie.id);
    appendToTarget(trendingList, item);
  });
}

function createTrendingMovie(src, alt, id) {
  const listItem = document.createElement("li");
  const anchor = document.createElement("a");
  const image = document.createElement("img");

  image.src = `${IMAGES_API}${src}`;
  image.alt = alt;
  anchor.classList.add("trending-movie");
  anchor.href = `../pages/movie.html?movie=${id}`;

  anchor.appendChild(image);
  listItem.appendChild(anchor);

  return listItem;
}

getGenres();
getAllTrending();
