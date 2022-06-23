import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBCollapse,
  MDBIcon,
} from 'mdb-react-ui-kit';

function Header() {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  const handleRedirectClick = ({ target }) => {
    const { value } = target;

    if (value === 'publish') {
      navigate(`/${value}`, { state: { editing: false } });
    } else if (value === 'home') {
      localStorage.removeItem('token');
      navigate('/');
    } else {
      navigate(`/${value}`);
    }
  };

  return (

    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">Navbar</MDBNavbarBrand>
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
              <MDBBtn
                outline
                color="success"
                className="me-2"
                value="blogPosts"
                type="button"
                onClick={handleRedirectClick}
              >
                Posts
              </MDBBtn>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBBtn
                outline
                color="success"
                className="me-2"
                value="publish"
                type="button"
                onClick={handleRedirectClick}
              >
                Publish
              </MDBBtn>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBBtn
                outline
                color="success"
                className="me-2"
                value="categories"
                type="button"
                onClick={handleRedirectClick}
              >
                categories
              </MDBBtn>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBBtn
                outline
                color="success"
                className="me-2"
                value="home"
                type="button"
                onClick={handleRedirectClick}
              >
                Logout
              </MDBBtn>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
export default Header;
