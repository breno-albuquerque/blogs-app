import React, { useState } from 'react';
import styled from 'styled-components';

import { register } from '../services/requests';

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

function Register() {
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    password: '',
    image: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    const token = await register(userData);

    localStorage.setItem('token', token);
  };

  const {
    displayName, email, password, image,
  } = userData;

  return (
    <Form>
      <input
        autoComplete="off"
        onChange={handleChange}
        value={displayName}
        type="text"
        placeholder="displayName"
        name="displayName"
      />
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
      <input
        autoComplete="off"
        onChange={handleChange}
        value={image}
        type="text"
        placeholder="image"
        name="image"
      />
      <button
        type="button"
        onClick={handleClick}
      >
        Register
      </button>
    </Form>
  );
}

export default Register;
