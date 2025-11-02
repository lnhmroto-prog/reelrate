import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShieldAlt, FaLock, FaCookie, FaUserSecret } from 'react-icons/fa';

const Privacy = () => {
  return (
    <Container className="mt-4">
      <Row className="mb-5">
        <Col>
          <div className="movie-info text-center fade-in">
            <h1 className="display-4 text-gradient mb-3">Privacy Policy</h1>
            <p className="lead text-muted movie-overview">
              Your privacy is important to us
            </p>
            <p className="text-muted">Last Updated: November 2, 2025</p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={10} className="mx-auto">
          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h2 className="text-gradient mb-4">
                <FaShieldAlt className="me-2" />
                Introduction
              </h2>
              <p className="text-secondary" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
                Welcome to ReelRate. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you use our movie review platform. Please read this policy carefully. 
                If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">
                <FaUserSecret className="me-2" />
                Information We Collect
              </h3>
              <h5 style={{ color: '#e50914' }} className="mb-3">Personal Information</h5>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8' }}>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="text-secondary mb-4" style={{ lineHeight: '2' }}>
                <li>Register for an account</li>
                <li>Write movie reviews</li>
                <li>Contact us for support</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8' }}>
                This information may include:
              </p>
              <ul className="text-secondary" style={{ lineHeight: '2' }}>
                <li>Name and email address</li>
                <li>Username and password</li>
                <li>Profile information</li>
                <li>Reviews and ratings you submit</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">
                <FaLock className="me-2" />
                How We Use Your Information
              </h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                We use the information we collect to:
              </p>
              <ul className="text-secondary" style={{ lineHeight: '2' }}>
                <li>Create and manage your account</li>
                <li>Display your reviews and ratings</li>
                <li>Improve and personalize your experience</li>
                <li>Send you updates and notifications (with your consent)</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">Data Security</h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                We use administrative, technical, and physical security measures to protect your personal 
                information. These include:
              </p>
              <ul className="text-secondary mb-4" style={{ lineHeight: '2' }}>
                <li>Encryption of sensitive data using Firebase Authentication</li>
                <li>Secure HTTPS connections</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
              </ul>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                However, no method of transmission over the Internet is 100% secure. While we strive to 
                protect your information, we cannot guarantee its absolute security.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">
                <FaCookie className="me-2" />
                Cookies and Tracking
              </h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                We may use cookies and similar tracking technologies to:
              </p>
              <ul className="text-secondary mb-4" style={{ lineHeight: '2' }}>
                <li>Keep you logged in</li>
                <li>Remember your preferences</li>
                <li>Analyze how you use our platform</li>
                <li>Improve our services</li>
              </ul>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                You can control cookies through your browser settings. However, disabling cookies may 
                affect your ability to use certain features of our platform.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">Third-Party Services</h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                We use third-party services to provide and improve our platform:
              </p>
              <ul className="text-secondary mb-4" style={{ lineHeight: '2' }}>
                <li><strong>TMDB (The Movie Database):</strong> Provides movie data and images</li>
                <li><strong>Firebase:</strong> Handles authentication and data storage</li>
              </ul>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                These services have their own privacy policies. We encourage you to review them.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">Your Rights</h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                You have the right to:
              </p>
              <ul className="text-secondary" style={{ lineHeight: '2' }}>
                <li>Access your personal information</li>
                <li>Update or correct your information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">Children's Privacy</h3>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                Our platform is not intended for children under 13. We do not knowingly collect personal 
                information from children under 13. If you believe we have collected such information, 
                please contact us immediately.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">Changes to This Policy</h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new policy on this page and updating the "Last Updated" date.
              </p>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg" style={{ 
            borderLeft: '4px solid #e50914',
            background: 'linear-gradient(135deg, #1f1f1f 0%, rgba(31, 31, 31, 0.8) 100%)'
          }}>
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-3">Contact Us</h3>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                If you have questions or concerns about this Privacy Policy, please contact us at{' '}
                <a href="/contact" style={{ color: '#e50914', textDecoration: 'none' }}>
                  our contact page
                </a>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Privacy;
