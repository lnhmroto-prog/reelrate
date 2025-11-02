import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { getReviews, markReviewHelpful } from '../services/reviewService';
import { getMovieDetails } from '../services/tmdbService';
import { sanitizeText } from '../utils/sanitize';
import { TIMEOUTS } from '../constants';
import StarRating from '../components/StarRating';
import { FaSearch, FaFilter, FaThumbsUp, FaFilm, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllReviews = async () => {
      setLoading(true);
      
      try {
        let reviewsResult;
        try {
          reviewsResult = await Promise.race([
            getReviews(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Firebase timeout')), TIMEOUTS.FIREBASE_QUERY)
            )
          ]);
          
          if (!reviewsResult.success) {
            throw new Error(reviewsResult.error);
          }
        } catch (firebaseError) {
          console.error('Firebase query failed:', firebaseError.message);
          throw firebaseError;
        }
        
        if (reviewsResult.success) {
          const reviewsWithMovieData = await Promise.all(
            reviewsResult.data.map(async (review) => {
              try {
                const movieDetails = await getMovieDetails(review.movieId);
                
                return {
                  id: review.id,
                  movieId: review.movieId,
                  movieTitle: movieDetails.title,
                  moviePoster: review.moviePoster || movieDetails.poster || 'https://via.placeholder.com/185x278/cccccc/666666?text=No+Image',
                  user: sanitizeText(review.userName || review.userEmail || 'Anonymous User'),
                  rating: review.rating,
                  comment: sanitizeText(review.comment),
                  date: review.createdAt ? review.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                  helpful: review.helpful || 0
                };
              } catch (movieError) {
                console.error(`Failed to fetch movie details for ${review.movieId}:`, movieError);
                return {
                  id: review.id,
                  movieId: review.movieId,
                  movieTitle: review.movieTitle || 'Unknown Movie',
                  moviePoster: review.moviePoster || 'https://via.placeholder.com/185x278/cccccc/666666?text=No+Image',
                  user: sanitizeText(review.userName || review.userEmail || 'Anonymous User'),
                  rating: review.rating,
                  comment: sanitizeText(review.comment),
                  date: review.createdAt ? review.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                  helpful: review.helpful || 0
                };
              }
            })
          );
          
          setReviews(reviewsWithMovieData);
          setFilteredReviews(reviewsWithMovieData);
        } else {
          console.error('Failed to fetch reviews:', reviewsResult.error);
          if (reviewsResult.error.includes('unavailable') || reviewsResult.error.includes('network')) {
            setError('Unable to connect to the database. Please check your internet connection and try again.');
          } else {
            setError('Failed to fetch reviews: ' + reviewsResult.error);
          }
          setReviews([]);
          setFilteredReviews([]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        if (error.message.includes('timeout') || error.message.includes('network')) {
          setError('Connection timeout. Please check your internet connection and try again.');
        } else if (error.message.includes('permission')) {
          setError('Access denied. Please make sure you are logged in.');
        } else {
          setError('Unable to load reviews at this time. Please try again later.');
        }
        setReviews([]);
        setFilteredReviews([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllReviews();
  }, []);

  useEffect(() => {
    let filtered = reviews;
    
    if (searchTerm) {
      filtered = filtered.filter(review => 
        review.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(ratingFilter));
    }
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });
    
    setFilteredReviews(filtered);
  }, [reviews, searchTerm, ratingFilter, sortBy]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleHelpfulClick = async (reviewId) => {
    try {
      const result = await markReviewHelpful(reviewId);
      
      if (result.success) {
        setReviews(prevReviews => 
          prevReviews.map(review => 
            review.id === reviewId 
              ? { ...review, helpful: review.helpful + 1 }
              : review
          )
        );
      } else {
        console.error('Failed to mark review as helpful:', result.error);
      }
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  if (loading) {
    return (
      <Container className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading reviews...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <div className="empty-state">
          <h3>Error Loading Reviews</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="movie-info text-center fade-in">
            <h1 className="display-4 text-gradient mb-3">All Movie Reviews</h1>
            <p className="lead text-muted movie-overview">
              Read what others think about their favorite movies
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <InputGroup className="shadow-sm">
            <InputGroup.Text className="bg-dark border-dark" style={{ color: '#e50914' }}>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search reviews, movies, or users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-dark text-light border-dark"
              style={{ 
                backgroundColor: 'rgba(42, 42, 42, 0.8)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            />
          </InputGroup>
        </Col>
        <Col md={3} className="mb-3 mb-md-0">
          <InputGroup className="shadow-sm">
            <InputGroup.Text className="bg-dark border-dark" style={{ color: '#e50914' }}>
              <FaStar />
            </InputGroup.Text>
            <Form.Select 
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="bg-dark text-light border-dark"
              style={{ 
                backgroundColor: 'rgba(42, 42, 42, 0.8)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <option value="all" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}>All Ratings</option>
              <option value="5" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}> 5 Stars</option>
              <option value="4" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}> 4 Stars</option>
              <option value="3" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}> 3 Stars</option>
              <option value="2" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}> 2 Stars</option>
              <option value="1" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}> 1 Star</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col md={3} className="mb-3 mb-md-0">
          <InputGroup className="shadow-sm">
            <InputGroup.Text className="bg-dark border-dark" style={{ color: '#e50914' }}>
              <FaFilter />
            </InputGroup.Text>
            <Form.Select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark text-light border-dark"
              style={{ 
                backgroundColor: 'rgba(42, 42, 42, 0.8)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <option value="newest" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}> Newest First</option>
              <option value="oldest" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}> Oldest First</option>
              <option value="highest" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}> Highest Rated</option>
              <option value="lowest" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}> Lowest Rated</option>
              <option value="helpful" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}> Most Helpful</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col md={2} className="mb-3 mb-md-0">
          <Button 
            variant="danger" 
            className="w-100 shadow-sm"
            onClick={() => {
              setSearchTerm('');
              setRatingFilter('all');
              setSortBy('newest');
            }}
          >
            <FaFilter className="me-1" />
            Clear
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <p className="text-muted">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          {reviews.length === 0 ? (
            <div className="empty-state">
              <h3>No Reviews Yet</h3>
              <p>Be the first to write a movie review! Search for a movie and share your thoughts.</p>
              <Link to="/search">
                <button className="btn btn-primary">
                  <FaFilm className="me-2" />
                  Find Movies to Review
                </button>
              </Link>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="empty-state">
              <h3>No Reviews Found</h3>
              <p>No reviews found matching your criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            filteredReviews.map(review => (
              <Card key={review.id} className="review-card mb-4 shadow-sm bg-dark text-light border-0">
                <Card.Body>
                  <Row>
                    <Col md={2} className="text-center">
                      <img 
                        src={review.moviePoster} 
                        alt={review.movieTitle}
                        className="img-fluid rounded mb-2 shadow"
                        style={{ maxHeight: '120px', border: '2px solid rgba(229, 9, 20, 0.3)' }}
                      />
                    </Col>
                    <Col md={10}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h5 className="mb-1">
                            <a 
                              href={`/movie/${review.movieId}`}
                              className="text-decoration-none text-light"
                              style={{ transition: 'color 0.3s' }}
                              onMouseEnter={(e) => e.target.style.color = '#e50914'}
                              onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                            >
                              {review.movieTitle}
                            </a>
                          </h5>
                          <div className="mb-2">
                            <Badge bg="danger" className="me-2">
                              {review.user}
                            </Badge>
                            <span className="me-2">
                              <StarRating rating={review.rating} size="sm" /> <span className="text-muted">({review.rating}/5)</span>
                            </span>
                            <small className="text-muted">
                              {formatDate(review.date)}
                            </small>
                          </div>
                        </div>
                      </div>
                      
                      <p className="mb-3 text-secondary" style={{ lineHeight: '1.8' }}>{review.comment}</p>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleHelpfulClick(review.id)}
                          className="text-light"
                        >
                          <FaThumbsUp className="me-1" />
                          Helpful ({review.helpful})
                        </Button>
                        <Link to={`/movie/${review.movieId}`}>
                          <Button 
                            variant="outline-light" 
                            size="sm"
                          >
                            <FaFilm className="me-1" />
                            View Movie
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>

      {filteredReviews.length > 0 && (
        <Row className="mt-4">
          <Col className="text-center">
            <Button variant="outline-danger" disabled>
              Load More Reviews (Coming Soon)
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};


export default Reviews;
