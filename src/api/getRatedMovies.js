import { key } from './const';

async function getRatedMovies(sessionId) {
  const moviesObj = await fetch(
    `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${key}&language=en-US&sort_by=created_at.asc`,
  ).then(
    (data) => data.json(),
  );
  console.log(moviesObj);
  return moviesObj;
}

export default getRatedMovies;
