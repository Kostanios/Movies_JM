import { key } from './const';

async function getGenres() {
  const genresArray = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`,
  ).then(
    (data) => data.json(),
  );
  return genresArray;
}
export default getGenres;
