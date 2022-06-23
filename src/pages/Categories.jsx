import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  MDBInput,
} from 'mdb-react-ui-kit';
import { createCategory } from '../services/requests';
import Header from '../components/Header';

const Form = styled.form`
  padding: 24px;
  
`;

const Button = styled.button`
  text-decoration: none;
  width: 100%;
  max-width: 200px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 16px;
  
  color: white;
  background-color: #222466;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 26px;
  color: #222466;
  margin-bottom: 32px;
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
        <Title>Create a new Category!</Title>
        <MDBInput
          type="text"
          name="category"
          value={category}
          label="New Category"
          onChange={handleChange}
        />
        <Button
          type="button"
          onClick={handleClick}
        >
          Create
        </Button>
      </Form>
    </>

  );
}

export default Categories;
