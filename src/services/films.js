const IMDBOT_API_URL = 'https://search.imdbot.workers.dev/';

export const getMoviesBy = async (keywords) => {
  try {
    const response = await fetch(`${IMDBOT_API_URL}?q=${keywords}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
