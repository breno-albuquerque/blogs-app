import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBCollapse,
  MDBIcon,
  MDBNavbarLink,
} from 'mdb-react-ui-kit';
import styled from 'styled-components';

const NavTitle = styled.h1`
  font-size: 28px;
  margin: 16px;
  margin-right: 24px;
  padding: 0;
`;

function Header() {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

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

    <MDBNavbar expand="lg" light bgColor="ligh">
      <MDBContainer fluid>
        <NavTitle w-auto>Blog API</NavTitle>
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
                className="me-3"
                type="button"
                onClick={(event) => handleRedirectClick(event, 'blogPosts')}
              >
                Posts
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                className="me-3"
                type="button"
                onClick={(event) => handleRedirectClick(event, 'publish')}
              >
                Publish
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                className="me-3"
                type="button"
                onClick={(event) => handleRedirectClick(event, 'categories')}
              >
                Categories
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                className="me-3"
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
export default Header;
