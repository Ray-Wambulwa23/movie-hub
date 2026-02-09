const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const fetchFromTMDB = async (endpoint, params = {}) => {
  let url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
  
  // Add additional parameters if provided
  Object.keys(params).forEach(key => {
    url += `&${key}=${params[key]}`;
  });
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('TMDB API Error:', error);
    throw error;
  }
};


export const getPopularMovies = () => {
  return fetchFromTMDB('/movie/popular');
};

export const getLatestMovies = () => {
    return fetchFromTMDB('/movie/now_playing');
};

export const searchMovies = (query) => {
  return fetchFromTMDB('/search/movie', { query: encodeURIComponent(query) });
};

export const getMovieDetails = (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}`);
};

export const getMovieCredits = (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}/credits`);
};

export const getMovieVideos = (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}/videos`);
};