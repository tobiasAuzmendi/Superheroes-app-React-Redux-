import axios from 'axios';
import md5 from 'md5';
const BASE_URL = 'http://gateway.marvel.com/v1/public';
const API_KEY = '06e9a507c233e4918b77f4185f39f5dc';
const P_KEY = '1cc0707c68ae7f61ee414b1fe6210ec2c4253209';
const LIMIT = 10;

const generateHashParams = () => {
  const currentTime = new Date().getTime();
  const hash = md5(`${currentTime}${P_KEY}${API_KEY}`);

  return `ts=${currentTime}&hash=${hash}`;
}

export const retrieveHeroes = async (page) => {
  const heroesResponseJson = await axios.get(
    `${BASE_URL}/characters?${generateHashParams()}&apikey=${API_KEY}&limit=${LIMIT}&offset=${page * LIMIT}`
  );

  return heroesResponseJson.data.data.results;
}

export const getHeroInformation = async (heroId) => {
  const heroResponseJson = await axios.get(`${BASE_URL}/characters/${heroId}?${generateHashParams()}&apikey=${API_KEY}`);

  const results = heroResponseJson.data.data.results;
  return results && results[0];
}