import { key, baseURL } from './const';

async function getMovies(page, lang, search, includeAdult) {
  const moviesObj = await fetch(
    `${baseURL}?api_key=${key}&language=${lang}&query=${search}&page=${page}&include_adult=${includeAdult}`,
  ).then(
    (data) => data.json(),
  );
  console.log(moviesObj);
  return moviesObj;
}

export default getMovies;
