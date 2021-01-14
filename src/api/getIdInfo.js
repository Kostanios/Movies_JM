import { key, baseGetByIdURL } from './const';

async function getIdInfo(id, lang) {
  const infoObj = await fetch(`${baseGetByIdURL}/${id}?api_key=${key}&language=${lang}`).then(
    (data) => data.json(),
  );
  return infoObj;
}

export default getIdInfo;
