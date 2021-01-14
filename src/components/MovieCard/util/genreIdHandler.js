const genreIdHandler = (genres, movieGenres) => movieGenres.map((id) => genres.find((el) => {
  if (el.id === id) {
    return true;
  }
  return false;
}));

export default genreIdHandler;
