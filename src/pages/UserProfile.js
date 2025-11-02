import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tab, Tabs, Button, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { getReviews, deleteReview, syncUserStats } from '../services/reviewService';
import { getUserProfile } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaTrash, FaStar, FaFilm } from 'react-icons/fa';
import StarRating from '../components/StarRating';

const UserProfile = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || !currentUser) {
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const response = await getReviews({ userId: currentUser.uid });
        const reviewsData = response.success ? (response.data || []) : [];
        setUserReviews(reviewsData);
        
        await syncUserStats(currentUser.uid);
        
        const profileResponse = await getUserProfile(currentUser.uid);
        if (profileResponse.success) {
          setUserProfile(profileResponse.data);
        }
        
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser?.uid, isAuthenticated]);

  const handleDeleteReview = async (reviewId, movieId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await deleteReview(reviewId, currentUser.uid);
        if (response.success) {
          setUserReviews(prev => prev.filter(review => review.id !== reviewId));
          setError(''); 
        } else {
          setError(response.error || 'Failed to delete review');
        }
      } catch (error) {
        console.error('Failed to delete review:', error);
        setError('Failed to delete review');
      }
    }
  };

  const calculateStats = () => {
    const reviewCount = Array.isArray(userReviews) ? userReviews.length : 0;
    const calculatedAvgRating = reviewCount === 0 ? 0 : 
      (userReviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount).toFixed(1);
    
    const totalReviews = userProfile?.totalReviews ?? reviewCount;
    const avgRating = userProfile?.averageRating ?? calculatedAvgRating;
    
    return { reviewCount, avgRating, totalReviews };
  };

  const stats = calculateStats();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          Please <Link to="/login">login</Link> to view your profile.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading your profile...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row>
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div 
                className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: '80px', height: '80px', fontSize: '2rem' }}
              >
                <FaUser />
              </div>
              <h2>{currentUser?.displayName || 'Movie Enthusiast'}</h2>
              <p className="text-muted mb-1">{currentUser?.email}</p>
              <small className="text-muted">
                Member since {formatDate(currentUser?.metadata?.creationTime || new Date())}
              </small>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light">
            <Card.Header className="bg-dark border-secondary">
              <h5 className="mb-0" style={{ color: '#e50914' }}>Statistics</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-light"><FaFilm className="me-2" style={{ color: '#e50914' }} />Total Reviews:</span>
                <Badge bg="danger" className="text-white">{stats.totalReviews}</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-light"><FaStar className="me-2" style={{ color: '#ffd700' }} />Average Rating:</span>
                <Badge style={{ background: '#ffd700', color: '#000' }}>{stats.avgRating} </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Tabs defaultActiveKey="reviews" id="profile-tabs" className="mb-3">
            <Tab eventKey="reviews" title={`Reviews (${stats.totalReviews})`}>
              {stats.totalReviews === 0 ? (
                <div className="empty-state">
                  <h3>No Reviews Yet</h3>
                  <p>You haven't written any reviews yet. Start sharing your movie thoughts!</p>
                  <Link to="/search">
                    <button className="btn btn-primary">
                      <FaFilm className="me-2" />
                      Find Movies to Review
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  {userReviews.map((review) => (
                    <Card key={review.id} className="mb-3">
                      <Card.Body>
                        <Row>
                          <Col sm={2}>
                            <img
                              src={review.moviePoster || `https://via.placeholder.com/80x120/666/fff?text=${review.movieTitle?.charAt(0) || 'M'}`}
                              alt={review.movieTitle}
                              className="img-fluid rounded"
                              style={{ maxHeight: '120px' }}
                            />
                          </Col>
                          <Col sm={10}>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <h5 className="mb-1">
                                  <Link to={`/movie/${review.movieId}`} className="text-decoration-none">
                                    {review.movieTitle}
                                  </Link>
                                </h5>
                                <div className="mb-2">
                                  <StarRating rating={review.rating} size="sm" />
                                  <span className="ms-2 text-muted">({review.rating}/5)</span>
                                </div>
                              </div>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteReview(review.id, review.movieId)}
                              >
                                <FaTrash className="me-1" />
                                Delete
                              </Button>
                            </div>
                            <p className="mb-2">{review.comment}</p>
                            <small className="text-muted">
                              Reviewed on {formatDate(review.createdAt || review.date)}
                            </small>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;


