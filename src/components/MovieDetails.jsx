import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieCredits } from '../services/tmdbApi';

function MovieDetails({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (imagePath, size = 'w500') => {
    if (!imagePath) return 'https://via.placeholder.com/300x450?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${imagePath}`;
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId)
        ]);
        
        setMovie(movieData);
        setCredits(creditsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="loading">Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!movie) return null;

  const director = credits?.crew?.find(person => person.job === 'Director');
  const mainCast = credits?.cast?.slice(0, 6) || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="movie-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        
        <div className="movie-details-content">
          <div className="movie-details-header">
            <img 
              src={getImageUrl(movie.poster_path)} 
              alt={movie.title}
              className="movie-details-poster"
            />
            <div className="movie-details-info">
              <h1 className="movie-details-title">{movie.title}</h1>
              <div className="movie-details-meta">
                <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</span>
                <span className="movie-year">({new Date(movie.release_date).getFullYear()})</span>
                <span className="movie-runtime">{movie.runtime} min</span>
              </div>
              <div className="movie-genres">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">{genre.name}</span>
                ))}
              </div>
              {director && <p className="movie-director">Directed by {director.name}</p>}
              <p className="movie-overview">{movie.overview}</p>
            </div>
          </div>

          {mainCast.length > 0 && (
            <div className="cast-section">
              <h3>Main Cast</h3>
              <div className="cast-grid">
                {mainCast.map(actor => (
                  <div key={actor.id} className="cast-member">
                    <img 
                      src={getImageUrl(actor.profile_path, 'w185')} 
                      alt={actor.name}
                      className="cast-photo"
                    />
                    <div className="cast-info">
                      <p className="cast-name">{actor.name}</p>
                      <p className="cast-character">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;