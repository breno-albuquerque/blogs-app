import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border: solid 1px black;
  height: 300px;

  min-width: 300px;
  max-width: 600px;

  margin: 0 auto;

  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  margin: auto;
`;

function Home() {
  const navigate = useNavigate();

  const handleClick = (endpoint) => {
    navigate(`/${endpoint}`);
  };

  return (
    <Container>
      <button
        type="button"
        onClick={() => handleClick('register')}
      >
        Register
      </button>
      <button
        type="button"
        onClick={() => handleClick('login')}
      >
        Login
      </button>
    </Container>
  );
}

export default Home;
