import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import { getMovieDetails, getMovieVideos } from '../services/tmdbService';
import { getReviews, createReview } from '../services/reviewService';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import { FaClock, FaCalendar, FaStar, FaCommentAlt, FaPaperPlane, FaSearch, FaPlay } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';


const MovieDetails = () => {
  const { id } = useParams();
  const { currentUser, isAuthenticated } = useAuth();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await getReviews({ movieId: id });
      if (response.success) {
        setReviews(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [id]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        
        const [movieData, videosData] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id)
        ]);
        
        setMovie(movieData);
        
        const officialTrailer = videosData.find(video => 
          video.type === 'Trailer' && video.name.toLowerCase().includes('official')
        ) || videosData.find(video => video.type === 'Trailer') || videosData[0];
        
        setTrailer(officialTrailer);
        
        await fetchReviews();
        
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setSubmitError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id, fetchReviews]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);
    
    if (!isAuthenticated) {
      setSubmitError('Please login to submit a review.');
      return;
    }
    
    if (!newReview.comment.trim()) {
      setSubmitError('Please write a review comment.');
      return;
    }
    
    try {
      setSubmitting(true);
      
      const reviewData = {
        movieId: parseInt(id),
        movieTitle: movie.title,
        moviePoster: movie.poster || movie.poster_path,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email,
        rating: parseInt(newReview.rating),
        comment: newReview.comment.trim()
      };
      
      const response = await createReview(reviewData);
      
      if (response.success) {
        setNewReview({ rating: 5, comment: '' });
        setSubmitSuccess(true);
        
        await fetchReviews();
        
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        setSubmitError(response.error || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <Container className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading movie details...</p>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="mt-4">
        <div className="empty-state">
          <h3>Movie Not Found</h3>
          <p>The movie you're looking for doesn't exist or has been removed.</p>
          <Link to="/search">
            <button className="btn btn-primary">
              <FaSearch className="me-2" />
              Search Movies
            </button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
      {/* Backdrop Image */}
      {(movie.backdrop || movie.backdrop_path) && (
        <div 
          className="position-relative mb-4"
          style={{
            height: '400px',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${movie.backdrop || movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <Container className="h-100 d-flex align-items-end pb-4">
            <div className="text-white">
              <h1 className="display-4 fw-bold">{movie.title}</h1>
              {movie.tagline && (
                <p className="lead fst-italic">"{movie.tagline}"</p>
              )}
            </div>
          </Container>
        </div>
      )}
      
      <Container>
        <Row className="mb-4">
          <Col md={4}>
            <img 
              src={movie.poster || movie.poster_path} 
              alt={movie.title}
              className="img-fluid rounded shadow"
              style={{ width: '100%', maxWidth: '400px' }}
            />
          </Col>
          <Col md={8}>
            {!(movie.backdrop || movie.backdrop_path) && (
              <>
                <h1>{movie.title}</h1>
                {movie.tagline && (
                  <p className="text-muted fst-italic">"{movie.tagline}"</p>
                )}
              </>
            )}
            
            <div className="mb-3">
              {movie.genres && movie.genres.length > 0 && movie.genres.map((genre, index) => (
                <Badge bg="secondary" className="me-2" key={index}>
                  {typeof genre === 'object' ? genre.name : genre}
                </Badge>
              ))}
            </div>
            
            <div className="mb-3">
              <strong><FaCalendar className="me-2" />Release Date:</strong> {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : (movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A')}<br/>
              <strong><FaClock className="me-2" />Runtime:</strong> {formatRuntime(movie.runtime)}<br/>
              <strong><MdMovie className="me-2" />Director:</strong> {movie.director}<br/>
              <strong><FaStar className="me-2" />Rating:</strong> <StarRating rating={Math.round((movie.vote_average || movie.rating || 0) / 2)} size="md" /> ({movie.vote_average || movie.rating || 0}/10 from {movie.vote_count || movie.voteCount || 0} votes)
            </div>
            
            <h5>Overview</h5>
            <p>{movie.overview}</p>
            
            {movie.cast && movie.cast.length > 0 && (
              <>
                <h6>Cast</h6>
                <p>{Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast}</p>
              </>
            )}
          </Col>
        </Row>

      {trailer && (
        <Row className="mb-5">
          <Col>
            <Card>
              <Card.Header>
                <h4>
                  <FaPlay className="me-2" />
                  Official Trailer
                </h4>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Row className="mb-5">
        <Col>
          <Card>
            <Card.Header>
              <h4>
                <FaCommentAlt className="me-2" />
                Write a Review
              </h4>
            </Card.Header>
            <Card.Body>
              {submitSuccess && (
                <Alert variant="success">
                  Review submitted successfully!
                </Alert>
              )}
              
              {submitError && (
                <Alert variant="danger">
                  {submitError}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmitReview}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Select 
                        value={newReview.rating}
                        onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                      >
                        <option value={5}>5 Stars - Excellent</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Good</option>
                        <option value={2}>2 Stars - Fair</option>
                        <option value={1}>1 Star - Poor</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Your Review</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4}
                    placeholder="Share your thoughts about this movie..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    required
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" disabled={submitting || !isAuthenticated}>
                  <FaPaperPlane className="me-2" />
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
                {!isAuthenticated && (
                  <small className="text-muted ms-3">
                    <Link to="/login">Login</Link> to submit a review
                  </small>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4 className="mb-4">User Reviews ({reviews.length})</h4>
          
          {reviews.length === 0 ? (
            <Alert variant="info">
              No reviews yet. Be the first to review this movie!
            </Alert>
          ) : (
            reviews.map(review => (
              <Card key={review.id} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-1">{review.userName || review.user || 'Anonymous'}</h6>
                      <div className="text-warning">
                        <StarRating rating={review.rating} size="md" /> ({review.rating}/5)
                      </div>
                    </div>
                    <small className="text-muted">
                      {review.createdAt 
                        ? new Date(review.createdAt).toLocaleDateString() 
                        : (review.date || 'N/A')
                      }
                    </small>
                  </div>
                  
                  <p className="mb-2">{review.comment}</p>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="outline-secondary" size="sm">
											Helpful ({review.helpful || 0})
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
      </Container>
    </Container>
  );
};


export default MovieDetails;
