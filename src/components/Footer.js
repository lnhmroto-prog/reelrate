import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFilm, FaGithub, FaTwitter, FaFacebook, FaInstagram, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-5" style={{ 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      borderTop: '2px solid rgba(229, 9, 20, 0.3)',
      padding: '3rem 0 1.5rem 0'
    }}>
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-gradient mb-3">
              <FaFilm className="me-2" />
              ReelRate
            </h5>
            <p className="text-muted" style={{ lineHeight: '1.8' }}>
              Your ultimate destination for discovering, reviewing, and sharing thoughts on the latest movies. 
              Powered by TMDB's extensive movie database.
            </p>
            <div className="mt-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="me-3"
                style={{ color: '#b3b3b3', fontSize: '1.5rem', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#e50914'}
                onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
              >
                <FaGithub />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="me-3"
                style={{ color: '#b3b3b3', fontSize: '1.5rem', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#e50914'}
                onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
              >
                <FaTwitter />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="me-3"
                style={{ color: '#b3b3b3', fontSize: '1.5rem', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#e50914'}
                onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
              >
                <FaFacebook />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#b3b3b3', fontSize: '1.5rem', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#e50914'}
                onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
              >
                <FaInstagram />
              </a>
            </div>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="mb-3" style={{ color: '#e50914', fontWeight: '700' }}>Quick Links</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li className="mb-2">
                <Link 
                  to="/" 
                  style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/search" 
                  style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
                >
                  Search Movies
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/reviews" 
                  style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
                >
                  All Reviews
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/profile" 
                  style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h6 className="mb-3" style={{ color: '#e50914', fontWeight: '700' }}>About</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li className="mb-2">
                <Link 
                  to="/about" 
                  style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/contact" 
                  style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
                >
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/privacy" 
                  style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/terms" 
                  style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h6 className="mb-3" style={{ color: '#e50914', fontWeight: '700' }}>Powered By</h6>
            <p className="text-muted mb-2">
              <a 
                href="https://www.themoviedb.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
              >
                The Movie Database (TMDB)
              </a>
            </p>
            <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '2rem 0 1.5rem 0' }} />
            <p className="text-center text-muted mb-0" style={{ fontSize: '0.9rem' }}>
              © {new Date().getFullYear()} ReelRate. Made with{' '}
              <FaHeart style={{ color: '#e50914', fontSize: '0.9rem' }} />{' '}
              for movie enthusiasts.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
