window.addEventListener("DOMContentLoaded", navigate, false);
window.addEventListener("hashchange", navigate, false);

function navigate() {
  if (location.hash.startsWith("#search=")) {
    searchPage();
    return;
  }

  if (location.hash.startsWith("#trends")) {
    trendsPage();
    return;
  }

  if (location.hash.startsWith("#genre=")) {
    genrePage();
    return;
  }

  if (location.hash.startsWith("#movie=")) {
    moviePage();
    return;
  }

  getGenres();
  getTrending();
}

const searchPage = () => {
  console.log("search");
};

const trendsPage = () => {
  console.log("trends");
};

const genrePage = () => {
  console.log("genre");
};

const moviePage = () => {
  console.log("movie");
};
