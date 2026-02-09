import { useState, useEffect } from 'react'
import { getPopularMovies, getLatestMovies, searchMovies } from './services/tmdbApi'
import './App.css'
import SearchBar from './components/SearchBar';
import MovieDetails from './components/MovieDetails';



function App() {
  const [movies, setMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x450?text=No+Image';
    return `https://image.tmdb.org/t/p/w500${imagePath}`;
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const data = await searchMovies(query);
      setSearchResults(data.results);
      setIsSearching(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to search movies');
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
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
      <h1>🎬Ray Movie Hub</h1>

    <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
      
      {isSearching ? (
        <>
          <h2 className="section-title">Search Results</h2>
          <div className="movies-grid">
            {searchResults.length > 0 ? (
              searchResults.map(movie => (
                <div 
                  key={movie.id} 
                  className="movie-card"
                  onClick={() => setSelectedMovieId(movie.id)}
                >
                  <img 
                    src={getImageUrl(movie.poster_path)} 
                    alt={movie.title}
                    className="movie-poster"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'}
                  />
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</p>
                </div>
              ))
            ) : (
              <p className="no-results">No movies found. Try a different search.</p>
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="section-title">Popular Movies</h2>
          <div className="movies-grid">
            {movies.map(movie => (
              <div 
                key={movie.id} 
                className="movie-card"
                onClick={() => setSelectedMovieId(movie.id)}
              >
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
              <div 
                key={movie.id} 
                className="movie-card"
                onClick={() => setSelectedMovieId(movie.id)}
              >
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
        </>
      )}

      {selectedMovieId && (
        <MovieDetails 
          movieId={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}
    </div>
    
  )
}

export default App