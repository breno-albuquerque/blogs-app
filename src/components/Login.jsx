import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
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

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = () => {

  };

  const { email, password } = userData;

  return (
    <Form>
      <input
        autoComplete="off"
        onChange={handleChange}
        value={email}
        type="email"
        placeholder="email"
        name="email"
      />
      <input
        autoComplete="off"
        onChange={handleChange}
        value={password}
        type="password"
        placeholder="password"
        name="password"
      />

      <button
        type="button"
        onClick={handleClick}
      >
        Login
      </button>
    </Form>
  );
}

export default Login;
