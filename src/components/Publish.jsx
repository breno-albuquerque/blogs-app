import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { edit, getCategories, publish } from '../services/requests';

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

  return (
    <Form>
      <input
        autoComplete="off"
        onChange={handleChange}
        value={title}
        type="text"
        placeholder="title"
        name="title"
      />
      <textarea
        autoComplete="off"
        onChange={handleChange}
        value={content}
        type="text"
        placeholder="content"
        name="content"
      />

      { (categoriesState && !location.state.editing)
      && categoriesState.map((category) => {
        const { name, id } = category;

        return (
          <label key={id} htmlFor={name}>
            <input
              name={name}
              id={name}
              type="checkbox"
              onChange={({ target }) => handleCheckboxChange(target, id)}
            />
            { name }
          </label>
        );
      }) }

      <button
        type="button"
        onClick={handleClick}
      >
        { location.state.editing ? 'Edit' : 'Publish'}
      </button>
    </Form>
  );
}

export default Publish;
