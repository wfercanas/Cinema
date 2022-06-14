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
}

getMovie();
