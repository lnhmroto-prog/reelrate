import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaFilm, FaStar, FaUsers, FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <Container className="mt-4">
      <Row className="mb-5">
        <Col>
          <div className="movie-info text-center fade-in">
            <h1 className="display-4 text-gradient mb-3">About ReelRate</h1>
            <p className="lead text-muted movie-overview">
              Your ultimate destination for movie reviews and ratings
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="bg-dark text-light border-0 shadow-lg">
            <Card.Body className="p-5">
              <h2 className="text-gradient mb-4">Our Story</h2>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                ReelRate was born from a passion for cinema and a desire to create a community where movie 
                enthusiasts can share their thoughts, discover new films, and connect with fellow film lovers. 
                We believe that every movie deserves to be discussed, every opinion matters, and every voice 
                should be heard.
              </p>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                Powered by The Movie Database (TMDB), we provide access to an extensive library of movies, 
                from timeless classics to the latest blockbusters. Our platform combines comprehensive movie 
                information with a vibrant community of reviewers who bring diverse perspectives to the 
                art of cinema.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 text-center bg-dark text-light border-0 shadow hover-lift">
            <Card.Body className="p-4">
              <div className="mb-3" style={{ fontSize: '3rem', color: '#e50914' }}>
                <FaFilm />
              </div>
              <h4 className="text-gradient mb-3">Extensive Library</h4>
              <p className="text-secondary">
                Access thousands of movies from TMDB's comprehensive database
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 text-center bg-dark text-light border-0 shadow hover-lift">
            <Card.Body className="p-4">
              <div className="mb-3" style={{ fontSize: '3rem', color: '#e50914' }}>
                <FaStar />
              </div>
              <h4 className="text-gradient mb-3">Rate & Review</h4>
              <p className="text-secondary">
                Share your opinions and help others discover great movies
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 text-center bg-dark text-light border-0 shadow hover-lift">
            <Card.Body className="p-4">
              <div className="mb-3" style={{ fontSize: '3rem', color: '#e50914' }}>
                <FaUsers />
              </div>
              <h4 className="text-gradient mb-3">Community</h4>
              <p className="text-secondary">
                Join a vibrant community of movie enthusiasts worldwide
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 text-center bg-dark text-light border-0 shadow hover-lift">
            <Card.Body className="p-4">
              <div className="mb-3" style={{ fontSize: '3rem', color: '#e50914' }}>
                <FaHeart />
              </div>
              <h4 className="text-gradient mb-3">Passion</h4>
              <p className="text-secondary">
                Built by movie lovers, for movie lovers
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="bg-dark text-light border-0 shadow-lg">
            <Card.Body className="p-5">
              <h2 className="text-gradient mb-4">Our Mission</h2>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                Our mission is to create an inclusive platform where movie lovers from all backgrounds can:
              </p>
              <ul className="text-secondary" style={{ lineHeight: '2', fontSize: '1.05rem' }}>
                <li className="mb-2">Discover new movies based on authentic community reviews</li>
                <li className="mb-2">Share their unique perspectives on films they love (or don't)</li>
                <li className="mb-2">Connect with others who share their passion for cinema</li>
                <li className="mb-2">Access comprehensive movie information in one convenient place</li>
                <li className="mb-2">Contribute to a growing database of thoughtful movie reviews</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="bg-dark text-light border-0 shadow-lg" style={{ 
            borderLeft: '4px solid #e50914',
            background: 'linear-gradient(135deg, #1f1f1f 0%, rgba(31, 31, 31, 0.8) 100%)'
          }}>
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-3">Powered by TMDB</h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                This product uses the TMDB API but is not endorsed or certified by TMDB. 
                We're grateful to The Movie Database for providing the comprehensive movie data 
                that powers our platform.
              </p>
              <a 
                href="https://www.themoviedb.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline-danger"
              >
                Learn More About TMDB
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
