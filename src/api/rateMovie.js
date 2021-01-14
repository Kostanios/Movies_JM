import { key } from './const';

async function rateMovie(value, sessionId, movieId) { // value example { value: 8.5 }
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${key}&guest_session_id=${sessionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(value),
  });
}

export default rateMovie;
