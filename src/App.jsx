import { useState, useEffect } from 'react'
import { getPopularMovies, getLatestMovies } from './services/tmdbApi'
import './App.css'
import SearchBar from './components/SearchBar';



function App() {
  const [movies, setMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x450?text=No+Image';
    return `https://image.tmdb.org/t/p/w500${imagePath}`;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const populardata = await getPopularMovies();
        const latestData = await getLatestMovies();

        setMovies(populardata.results);
        setLatestMovies(latestData.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading movies...</div>;
  
  if (error) return <div className="error">Error: {error}</div>;

  return (

    <div className="App">
      <h1>🎬 Movie Hub</h1>

    <SearchBar/>
      
      <h2 className="section-title">Popular Movies</h2>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img 
              src={getImageUrl(movie.poster_path)} 
              alt={movie.title}
              className="movie-poster"
              onError={(e) => e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'}
            />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">Latest Movies</h2>
      <div className="movies-grid">
        {latestMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img 
              src={getImageUrl(movie.poster_path)} 
              alt={movie.title}
              className="movie-poster"
              onError={(e) => e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'}
            />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App