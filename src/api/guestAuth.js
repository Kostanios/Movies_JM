import { key } from './const';

async function guestAuth() {
  const authObj = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${key}`).then(
    (data) => data.json(),
  );
  return authObj;
}

export default guestAuth;
