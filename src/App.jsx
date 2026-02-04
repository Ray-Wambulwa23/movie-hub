import { useState, useEffect } from 'react'
import { getPopularMovies, getLatestMovies } from './services/tmdbApi'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading movies...</div>;
  
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Popular Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>

      <h1>Latest Movies</h1>
    <ul>
      {latestMovies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
    </div>
  )
}

export default App