import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBIcon,
  MDBNavbarLink,
} from 'mdb-react-ui-kit';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavTitle = styled.h1`
  color: #222466;

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

    <MDBNavbar
      fixed={fixed ? 'top' : null}
      sticky={!fixed}
      expand="lg"
      light
      bgColor="light"
    >

      <MDBContainer fluid>
        <NavTitle>Blog API</NavTitle>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink
                disabled={isDisabled}
                className="me-3"
                type="button"
                onClick={(event) => handleRedirectClick(event, 'blogPosts')}
              >
                Posts
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                disabled={isDisabled}
                className="me-3"
                type="button"
                onClick={(event) => handleRedirectClick(event, 'publish')}
              >
                Publish
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                disabled={isDisabled}
                className="me-3"
                type="button"
                onClick={(event) => handleRedirectClick(event, 'categories')}
              >
                Categories
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                disabled={isDisabled}
                className="me-3 text-danger"
                type="button"
                onClick={(event) => handleRedirectClick(event, 'home')}
              >
                Logout
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

Header.propTypes = {
  fixed: PropTypes.bool,
};

Header.defaultProps = {
  fixed: false,
};

export default Header;
