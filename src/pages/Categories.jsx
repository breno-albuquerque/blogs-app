import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createCategory } from '../services/requests';
import Header from '../components/Header';

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

function Categories() {
  const [category, setCategory] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { value } = target;

    setCategory(value);
  };

  const handleClick = async () => {
    await createCategory(token, category);
    navigate('/publish', { state: { editing: false } });
  };

  if (!token) return navigate('/');

  return (
    <>
      <Header />
      <Form>
        <input
          type="text"
          name="category"
          value={category}
          placeholder="New Category"
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={handleClick}
        >
          Create
        </button>
      </Form>
    </>

  );
}

export default Categories;
