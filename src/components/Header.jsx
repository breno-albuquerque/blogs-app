import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.header`
  
`;

function Header() {
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
    <Container>
      <button
        value="blogPosts"
        type="button"
        onClick={handleRedirectClick}
      >
        Posts
      </button>
      <button
        value="publish"
        type="button"
        onClick={handleRedirectClick}
      >
        Publish
      </button>
      <button
        value="categories"
        type="button"
        onClick={handleRedirectClick}
      >
        categories
      </button>
      <button
        value="home"
        type="button"
        onClick={handleRedirectClick}
      >
        Logout
      </button>
    </Container>
  );
}

export default Header;
