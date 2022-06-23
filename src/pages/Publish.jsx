import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  MDBInput,
  MDBTextArea,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import { edit, getCategories, publish } from '../services/requests';
import Header from '../components/Header';

const Form = styled.form`
  padding: 24px;
`;

const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 26px;
`;

const Button = styled.button`
  text-decoration: none;
  width: 100%;
  max-width: 200px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  
  color: white;
  background-color: #222466;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 26px;
  color: #222466;
  margin-bottom: 32px;
`;

function Publish() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const [categoriesState, setCategoriesState] = useState();
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    categoryIds: [],
  });

  //  Pega as categorias da API
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories(token);
      setCategoriesState(data);
    };

    fetchCategories();
  }, []);

  //  Atualiza o array com os ids das categorias marcadas
  useEffect(() => {
    setPostData((prev) => ({
      ...prev,
      categoryIds: checkedCategories,
    }));
  }, [checkedCategories]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = ({ checked }, id) => {
    setCheckedCategories((prev) => {
      if (checked) {
        return [...prev, id];
      }
      return prev.filter((catId) => catId !== id);
    });
  };

  const handleClick = async () => {
    if (location.state.editing) {
      await edit(token, postData, location.state.id);
    } else {
      await publish(token, postData);
    }
    navigate('/blogPosts');
  };

  const { title, content } = postData;

  if (!token) return navigate('/');

  return (
    <>
      <Header />
      <Form>
        <Title>Publish your Post!</Title>
        <MDBInput
          type="text"
          wrapperClass="mb-4"
          label="Post Title"
          autoComplete="off"
          onChange={handleChange}
          value={title}
          name="title"
        />
        <MDBTextArea
          wrapperClass="mb-4"
          textarea
          rows={4}
          label="Post Content"
          autoComplete="off"
          onChange={handleChange}
          value={content}
          type="text"
          name="content"
        />

        <CheckboxContainer>
          { (categoriesState && !location.state.editing)
      && categoriesState.map((category) => {
        const { name, id } = category;

        return (
          <MDBCheckbox
            key={id}
            name={name}
            id={name}
            type="checkbox"
            label={name}
            onChange={({ target }) => handleCheckboxChange(target, id)}
          />
        );
      }) }
        </CheckboxContainer>

        <Button
          type="button"
          onClick={handleClick}
        >
          { location.state.editing ? 'Edit' : 'Publish'}
        </Button>
      </Form>
    </>
  );
}

export default Publish;
