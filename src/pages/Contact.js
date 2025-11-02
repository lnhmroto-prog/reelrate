import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaEnvelope, FaUser, FaComment, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Container className="mt-4">
      <Row className="mb-5">
        <Col>
          <div className="movie-info text-center fade-in">
            <h1 className="display-4 text-gradient mb-3">Contact Us</h1>
            <p className="lead text-muted movie-overview">
              We'd love to hear from you! Send us a message and we'll get back to you soon.
            </p>
          </div>
        </Col>
      </Row>

      {submitted && (
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <Alert variant="success" className="shadow">
              <strong>Thank you!</strong> Your message has been sent successfully. We'll get back to you soon!
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="bg-dark text-light border-0 shadow-lg">
            <Card.Body className="p-5">
              <h2 className="text-gradient mb-4">Send Us a Message</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-light d-flex align-items-center">
                    <FaUser className="me-2" style={{ color: '#e50914' }} />
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-dark text-light"
                    style={{
                      backgroundColor: 'rgba(42, 42, 42, 0.8)',
                      color: '#ffffff',
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-light d-flex align-items-center">
                    <FaEnvelope className="me-2" style={{ color: '#e50914' }} />
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-dark text-light"
                    style={{
                      backgroundColor: 'rgba(42, 42, 42, 0.8)',
                      color: '#ffffff',
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-light d-flex align-items-center">
                    <FaComment className="me-2" style={{ color: '#e50914' }} />
                    Subject
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="bg-dark text-light"
                    style={{
                      backgroundColor: 'rgba(42, 42, 42, 0.8)',
                      color: '#ffffff',
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-light d-flex align-items-center">
                    <FaComment className="me-2" style={{ color: '#e50914' }} />
                    Message
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    required
                    className="bg-dark text-light"
                    style={{
                      backgroundColor: 'rgba(42, 42, 42, 0.8)',
                      color: '#ffffff',
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                  />
                </Form.Group>

                <Button variant="danger" type="submit" size="lg" className="w-100">
                  <FaPaperPlane className="me-2" />
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center bg-dark text-light border-0 shadow hover-lift">
            <Card.Body className="p-4">
              <div className="mb-3" style={{ fontSize: '2.5rem', color: '#e50914' }}>
                <FaEnvelope />
              </div>
              <h5 className="text-gradient mb-2">Email Us</h5>
              <p className="text-muted">support@reelrate.com</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 text-center bg-dark text-light border-0 shadow hover-lift">
            <Card.Body className="p-4">
              <div className="mb-3" style={{ fontSize: '2.5rem', color: '#e50914' }}>
                💬
              </div>
              <h5 className="text-gradient mb-2">Response Time</h5>
              <p className="text-muted">Within 24-48 hours</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 text-center bg-dark text-light border-0 shadow hover-lift">
            <Card.Body className="p-4">
              <div className="mb-3" style={{ fontSize: '2.5rem', color: '#e50914' }}>
                🌍
              </div>
              <h5 className="text-gradient mb-2">Available</h5>
              <p className="text-muted">24/7 Support</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;

