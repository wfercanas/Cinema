const API = "https://api.themoviedb.org/3";
const GENRES_ENDPOINT = "/genre/movie/list";

async function getGenres() {
  const response = await fetch(`${API}${GENRES_ENDPOINT}?api_key=${API_KEY}`);
  const { genres } = await response.json();

  const genresList = document.querySelector("#genres ul");
  console.log(genres);
  console.log(genresList);
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

getGenres();
