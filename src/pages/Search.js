import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { searchMovies as searchTMDB, getPopularMovies } from '../services/tmdbService';
import StarRating from '../components/StarRating';
import { FaSearch, FaFilm, FaInfoCircle, FaBolt } from 'react-icons/fa';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const popularData = await getPopularMovies();
        setPopularMovies(popularData.movies.slice(0, 12));
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Failed to load popular movies');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const performSearch = async (query, page = 1) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await searchTMDB(query, page);
      setSearchResults(data.movies);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setSearchPerformed(true);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm);
    }
  };

  const handlePageChange = (page) => {
    if (searchTerm.trim()) {
      performSearch(searchTerm, page);
    }
  };



  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <div className="text-center movie-info fade-in">
            <h1 className="display-4 mb-3 text-gradient">Search Movies</h1>
            <p className="lead text-muted movie-overview">
              Find movies to read and write reviews from our extensive TMDB database
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <form onSubmit={handleSearch}>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter movie title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={loading || !searchTerm.trim()}
              >
                {loading ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch className="me-2" />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <div className="empty-state" style={{padding: '1rem', margin: '1rem 0'}}>
              <p style={{margin: '0', color: '#dc3545'}}> {error}</p>
            </div>
          </Col>
        </Row>
      )}

      {searchPerformed && !loading && (
        <Row className="mb-4">
          <Col>
            <h3>Search Results</h3>
            {searchResults.length === 0 ? (
              <div className="empty-state">
                <h3>No movies found</h3>
                <p>No movies found for "{searchTerm}". Try a different search term.</p>
              </div>
            ) : (
              <p className="text-muted text-center mb-4">
                Found {searchResults.length} movie(s) for "{searchTerm}"
              </p>
            )}
          </Col>
        </Row>
      )}

      <Row>
        {searchResults.map(movie => (
          <Col md={6} lg={4} key={movie.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={movie.poster} 
                alt={movie.title}
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <div className="mb-2">
                  <small className="text-muted">
                    {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'TBA'}
                  </small>
                  <span className="ms-2">
                    <StarRating rating={movie.rating / 2} size="sm" />
                    <span className="text-muted ms-1">({(movie.rating / 2).toFixed(1)}/5)</span>
                  </span>
                </div>
                <Card.Text className="flex-grow-1">
                  {movie.overview && movie.overview.length > 100 
                    ? movie.overview.substring(0, 100) + '...' 
                    : movie.overview || 'No description available.'
                  }
                </Card.Text>
                <Link to={`/movie/${movie.id}`}>
                  <Button variant="primary" className="w-100 mt-auto">
                    <FaInfoCircle className="me-2" />
                    View Details & Reviews
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {searchPerformed && totalPages > 1 && (
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === 1}
              />
              <Pagination.Prev 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
              />
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Pagination.Item>
                );
              })}
              
              <Pagination.Next 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
              />
              <Pagination.Last 
                onClick={() => handlePageChange(totalPages)} 
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      )}

      {!searchPerformed && !loading && (
        <Row className="mt-5">
          <Col>
            <h4 className="mb-4">
              <FaFilm className="me-2" />
              Popular Movies
            </h4>
            <Row>
              {popularMovies.map(movie => (
                <Col lg={3} md={4} sm={6} key={movie.id} className="mb-4">
                  <div className="movie-card-modern fade-in-stagger">
                    <div className="movie-poster-container">
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
												className="movie-poster"
                      />
                      <div className="movie-overlay">
                        <div className="movie-year">
                          {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'TBA'}
                        </div>
                        <div className="movie-rating-badge">
                          <span className="rating-number">{(movie.rating / 2).toFixed(1)}</span>
                          <div className="rating-stars">
                            <StarRating rating={movie.rating / 2} size="sm" />
                          </div>
                        </div>
                      </div>
                      <div className="movie-hover-content">
                        <Link to={`/movie/${movie.id}`}>
                          <button className="btn btn-primary btn-sm w-100">
                            <FaInfoCircle className="me-2" />
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="movie-card-info">
                      <h5 className="movie-title-modern" title={movie.title}>
                        {movie.title}
                      </h5>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            
            <div className="movie-info mt-5 text-center p-4">
              <h5 className="text-gradient mb-3">
                <FaBolt className="me-2" style={{ color: '#e50914' }} />
                Quick Search Suggestions
              </h5>
              <p className="text-muted mb-4">Try searching for popular movies and genres</p>
              <div className="mt-3">
                {['Avengers', 'Batman', 'Star Wars', 'Marvel', 'Disney', 'Comedy', 'Action', 'Horror'].map(term => (
                  <button
                    key={term}
                    className="btn btn-outline-danger me-2 mb-2"
                    onClick={() => {
                      setSearchTerm(term);
                      performSearch(term);
                    }}
                  >
                    <FaSearch className="me-1" style={{ fontSize: '0.9rem' }} />
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};


export default Search;
