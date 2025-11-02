import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getPopularMovies, getTrendingMovies } from '../services/tmdbService';
import { getReviews } from '../services/reviewService';
import StarRating from '../components/StarRating';
import { FaFilm, FaFire, FaComments, FaArrowRight, FaPlay } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        const trending = await getTrendingMovies('week');
        setTrendingMovies(Array.isArray(trending) ? trending.slice(0, 5) : []);
        
        const popularData = await getPopularMovies();
        setFeaturedMovies(popularData?.movies ? popularData.movies.slice(0, 6) : []);
        
        const reviewsResponse = await getReviews();
        if (reviewsResponse.success && reviewsResponse.data) {
          setRecentReviews(reviewsResponse.data.slice(0, 4));
        } else {
          setRecentReviews([]);
        }
        
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <Container className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading the latest cinematic experiences...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <div className="empty-state">
          <h3>⚠️ Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-5">
        <Col>
          <div className="movie-info text-center fade-in">
            <h1 className="display-4 text-gradient mb-4">Welcome to ReelRate</h1>
            <p className="lead movie-overview">
              Discover, review, and share your thoughts on the latest movies from TMDB. 
              Experience cinema like never before with our comprehensive movie database.
            </p>
            <Link to="/search">
              <button className="btn btn-primary btn-lg">
                <FaFilm className="me-2" />
                Start Exploring Movies
                <FaArrowRight className="ms-2" />
              </button>
            </Link>
          </div>
        </Col>
      </Row>

      {trendingMovies.length > 0 && (
        <Row className="mb-5">
          <Col>
            <h2 className="mb-4 text-gradient">
              <MdTrendingUp className="me-2" style={{ fontSize: '1.8rem' }} />
              Trending This Week
            </h2>
            <Carousel className="mb-4">
              {trendingMovies.map((movie, index) => (
                <Carousel.Item key={movie.id}>
                  <div
                    className="carousel-hero-slide movie-backdrop"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${movie.backdrop})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '500px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Container>
                      <Row>
                        <Col md={8}>
                          <h2 className="text-gradient mb-3 display-5">{movie.title}</h2>
                          <p className="text-white lead mb-4 movie-overview" style={{padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', borderLeft: '4px solid #e50914'}}>
                            {movie.overview?.substring(0, 200)}...
                          </p>
                          <div className="mb-4">
                            <div className="star-rating mb-2">
                              <StarRating rating={movie.rating / 2} size="lg" />
                            </div>
                            <span className="text-white">
                              {(movie.rating / 2).toFixed(1)}/5 • {movie.voteCount} votes
                            </span>
                          </div>
                          <Link to={`/movie/${movie.id}`}>
                            <button className="btn btn-primary btn-lg">
                              <FaPlay className="me-2" />
                              View Details
                            </button>
                          </Link>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}

      <Row className="mb-5">
        <Col>
          <h2 className="mb-4 text-gradient">
            <FaFire className="me-2" style={{ fontSize: '1.8rem' }} />
            Popular Movies
          </h2>
          <Row>
            {featuredMovies.map((movie, index) => (
              <Col lg={3} md={4} sm={6} key={movie.id} className="mb-4">
                <div className={`movie-card-modern fade-in-stagger`}>
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
                        <button className="btn btn-primary btn-modern">
                          <span>View Details</span>
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
          <div className="text-center">
            <Link to="/search">
              <button className="btn btn-secondary">
                <FaFilm className="me-2" />
                Explore More Movies
              </button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="mb-4 text-gradient">
            <FaComments className="me-2" style={{ fontSize: '1.8rem' }} />
            Recent Reviews
          </h2>
          {recentReviews.length > 0 ? (
            <>
              {recentReviews.map((review, index) => (
                <div key={review.id} className={`review-card fade-in-stagger`}>
                  <div className="review-header">
                    <div className="review-user">
                      {review.username || review.userEmail || 'Anonymous'}
                    </div>
                    <div className="review-date">
                      {review.createdAt 
                        ? new Date(review.createdAt).toLocaleDateString()
                        : 'Recently'
                      }
                    </div>
                  </div>
                  <h5 className="text-gradient mb-3">{review.movieTitle}</h5>
                  <div className="star-rating mb-3">
                    <StarRating rating={review.rating} size="md" />
                    <span className="ms-2 text-muted">({review.rating}/5)</span>
                  </div>
                  <p className="review-text">"{review.comment}"</p>
                  <div className="review-actions">
                    <Link to={`/movie/${review.movieId}`}>
                      <button className="btn btn-primary btn-sm">
                        <FaPlay className="me-2" />
                        View Movie
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <Link to="/reviews">
                  <button className="btn btn-secondary">
                    View All Reviews
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h3>No reviews yet</h3>
              <p>Be the first to share your movie thoughts!</p>
              <Link to="/search">
                <button className="btn btn-primary">
                  Find Movies to Review
                </button>
              </Link>
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={4} className="text-center mb-3">
          <div className="card hover-lift">
            <div className="card-body">
              <h3 className="text-gradient">{featuredMovies.length > 0 ? '1000+' : '...'}</h3>
              <p className="text-muted mb-0">Movies Available</p>
            </div>
          </div>
        </Col>
        <Col md={4} className="text-center mb-3">
          <div className="card hover-lift">
            <div className="card-body">
              <h3 className="text-gradient">{recentReviews.length > 0 ? `${recentReviews.length}+` : '...'}</h3>
              <p className="text-muted mb-0">User Reviews</p>
            </div>
          </div>
        </Col>
        <Col md={4} className="text-center mb-3">
          <div className="card hover-lift">
            <div className="card-body">
              <h3 className="text-gradient">TMDB</h3>
              <p className="text-muted mb-0">Powered by</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;