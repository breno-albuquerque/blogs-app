import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  Container, Navbar, Nav,
} from 'react-bootstrap';

const NavTitle = styled.h1`
  color: #ef3f46;
  font-size: 28px;
  margin: 16px;
  margin-right: 24px;
  padding: 0;
`;

function Header({ fixed }) {
  const [showNav, setShowNav] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isDisabled, setisDisabled] = useState(true);

  useEffect(() => {
    if (token) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  }, []);

  const handleRedirectClick = (event, endpoint) => {
    event.preventDefault();

    if (endpoint === 'publish') {
      navigate(`/${endpoint}`, { state: { editing: false } });
    } else if (endpoint === 'home') {
      localStorage.removeItem('token');
      navigate('/');
    } else {
      navigate(`/${endpoint}`);
    }
  };

  return (

    <Navbar
      fixed={fixed ? 'top' : null}
      sticky={!fixed}
      expand="lg"
      bg="secondary"
      className="navbar-dark"
    >
      <Container>
        <NavTitle>Blog API</NavTitle>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>

            <Nav.Link
              disabled={isDisabled}
              className="text-light me-3"
              type="button"
              onClick={(event) => handleRedirectClick(event, 'blogPosts')}
            >
              Posts
            </Nav.Link>

            <Nav.Link
              disabled={isDisabled}
              className="text-light me-3"
              type="button"
              onClick={(event) => handleRedirectClick(event, 'publish')}
            >
              Publish
            </Nav.Link>

            <Nav.Link
              disabled={isDisabled}
              className="text-light me-3"
              type="button"
              onClick={(event) => handleRedirectClick(event, 'profile')}
            >
              Profile
            </Nav.Link>

            <Nav.Link
              disabled={isDisabled}
              className="me-3 text-primary fw-bold"
              type="button"
              onClick={(event) => handleRedirectClick(event, 'home')}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  fixed: PropTypes.bool,
};

Header.defaultProps = {
  fixed: false,
};

export default Header;
