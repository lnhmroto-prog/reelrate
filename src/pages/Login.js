import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const result = await loginUser(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} lg={4}>
          <div className="movie-info fade-in">
            <div className="text-center mb-4">
              <MdMovie style={{ fontSize: '3rem' }} className="text-gradient mb-3" />
              <h3 className="text-gradient">Login to ReelRate</h3>
              <p className="text-muted">Welcome back, movie enthusiast!</p>
            </div>
            {error && (
              <div className="empty-state" style={{padding: '1rem', margin: '1rem 0'}}>
                <p style={{margin: '0', color: '#dc3545'}}>⚠️ {error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Logging in...
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="me-2" />
                    Login
                  </>
                )}
              </button>
            </form>
            
            <div className="text-center mt-4">
              <p className="text-muted">
                Don't have an account? <Link to="/register" className="text-decoration-none">
                  <FaUserPlus className="me-1" />
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;