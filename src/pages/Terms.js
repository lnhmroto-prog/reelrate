import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaFileContract, FaUserCheck, FaExclamationTriangle, FaBalanceScale } from 'react-icons/fa';

const Terms = () => {
  return (
    <Container className="mt-4">
      <Row className="mb-5">
        <Col>
          <div className="movie-info text-center fade-in">
            <h1 className="display-4 text-gradient mb-3">Terms of Service</h1>
            <p className="lead text-muted movie-overview">
              Please read these terms carefully before using ReelRate
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
                <FaFileContract className="me-2" />
                Agreement to Terms
              </h2>
              <p className="text-secondary" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
                By accessing and using ReelRate, you accept and agree to be bound by the terms and provisions 
                of this agreement. If you do not agree to these terms, please do not use our platform.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">
                <FaUserCheck className="me-2" />
                User Accounts
              </h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                When you create an account with us, you agree to:
              </p>
              <ul className="text-secondary mb-4" style={{ lineHeight: '2' }}>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as needed</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">User Content and Reviews</h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                When you submit reviews or other content to ReelRate, you agree that:
              </p>
              <ul className="text-secondary mb-4" style={{ lineHeight: '2' }}>
                <li>You own or have the right to submit the content</li>
                <li>Your content does not violate any laws or third-party rights</li>
                <li>Your reviews are honest and based on your genuine experience</li>
                <li>You will not submit spam, offensive, or inappropriate content</li>
                <li>We may use, display, and distribute your content on our platform</li>
              </ul>
              <h5 style={{ color: '#e50914' }} className="mb-3">Content Standards</h5>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                All user content must:
              </p>
              <ul className="text-secondary" style={{ lineHeight: '2' }}>
                <li>Be respectful and civil</li>
                <li>Avoid hate speech, discrimination, or harassment</li>
                <li>Not contain explicit, violent, or illegal content</li>
                <li>Not violate intellectual property rights</li>
                <li>Be relevant to movies and cinema</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">Intellectual Property</h3>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8' }}>
                The ReelRate platform, including its design, features, and content (excluding user-generated 
                content), is owned by us and protected by copyright, trademark, and other laws.
              </p>
              <h5 style={{ color: '#e50914' }} className="mb-3">TMDB Attribution</h5>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                Movie data, images, and related content are provided by The Movie Database (TMDB). 
                This product uses the TMDB API but is not endorsed or certified by TMDB.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">Acceptable Use</h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                You agree NOT to:
              </p>
              <ul className="text-secondary" style={{ lineHeight: '2' }}>
                <li>Use the platform for any unlawful purpose</li>
                <li>Attempt to hack, disrupt, or interfere with the platform</li>
                <li>Scrape, copy, or download content without permission</li>
                <li>Create fake accounts or manipulate ratings</li>
                <li>Harass, threaten, or impersonate other users</li>
                <li>Distribute malware, viruses, or harmful code</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">
                <FaExclamationTriangle className="me-2" />
                Disclaimer of Warranties
              </h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                ReelRate is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either 
                express or implied, including but not limited to:
              </p>
              <ul className="text-secondary mb-4" style={{ lineHeight: '2' }}>
                <li>Accuracy, reliability, or completeness of content</li>
                <li>Uninterrupted or error-free service</li>
                <li>Security of your data</li>
                <li>Results from using the platform</li>
              </ul>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                We do not guarantee that the platform will meet your requirements or that any errors 
                will be corrected.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">
                <FaBalanceScale className="me-2" />
                Limitation of Liability
              </h3>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                To the maximum extent permitted by law, ReelRate and its operators shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages, including but 
                not limited to loss of profits, data, use, or goodwill, arising from:
              </p>
              <ul className="text-secondary mt-3" style={{ lineHeight: '2' }}>
                <li>Your use or inability to use the platform</li>
                <li>Unauthorized access to your account</li>
                <li>User content or conduct</li>
                <li>Errors, bugs, or interruptions in service</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">Termination</h3>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                We reserve the right to:
              </p>
              <ul className="text-secondary mb-4" style={{ lineHeight: '2' }}>
                <li>Suspend or terminate your account at any time</li>
                <li>Remove any content that violates these terms</li>
                <li>Refuse service to anyone for any reason</li>
              </ul>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                You may also delete your account at any time through your profile settings.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">Changes to Terms</h3>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes by updating the "Last Updated" date. Your continued use of the platform 
                after changes constitutes acceptance of the new terms.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg mb-4">
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-4">Governing Law</h3>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                These terms shall be governed by and construed in accordance with applicable laws. 
                Any disputes arising from these terms or your use of the platform shall be resolved 
                through binding arbitration.
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-light border-0 shadow-lg" style={{ 
            borderLeft: '4px solid #e50914',
            background: 'linear-gradient(135deg, #1f1f1f 0%, rgba(31, 31, 31, 0.8) 100%)'
          }}>
            <Card.Body className="p-5">
              <h3 className="text-gradient mb-3">Questions?</h3>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                If you have any questions about these Terms of Service, please{' '}
                <a href="/contact" style={{ color: '#e50914', textDecoration: 'none' }}>
                  contact us
                </a>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Terms;
