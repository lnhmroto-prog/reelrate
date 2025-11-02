import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';
import { FaHome, FaSearch, FaFilm, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';

const Navigation = () => {
  const { currentUser, userProfile, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-gradient">
            <MdMovie className="me-2" style={{ fontSize: '1.5rem' }} />
            ReelRate
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <FaHome className="me-1" /> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/search">
              <Nav.Link>
                <FaSearch className="me-1" /> Search Movies
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/reviews">
              <Nav.Link>
                <FaFilm className="me-1" /> All Reviews
              </Nav.Link>
            </LinkContainer>
            {isAuthenticated && (
              <LinkContainer to="/profile">
                <Nav.Link>
                  <FaUser className="me-1" /> My Profile
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={
                  <>
                    <FaUser className="me-1" />
                    Hi, {userProfile?.username || currentUser?.displayName || 'User'}!
                  </>
                } 
                id="user-dropdown"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    <FaUser className="me-2" /> My Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaSignInAlt className="me-1" /> Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <FaUser className="me-1" /> Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;