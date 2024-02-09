const IMDBOT_API_URL = 'https://search.imdbot.workers.dev/';

export const getMoviesBy = (keywords) => {
  return fetch(`${IMDBOT_API_URL}?q=${keywords}`);
};

export const getMoviesBy2 = (keywords) => {
  return fetch(`https://search.imdbot.workers.dev/?tt=${keywords}`);
};