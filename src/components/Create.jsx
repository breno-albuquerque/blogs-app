import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCategories } from '../services/requests';

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

function Create() {
  const [categoriesState, setCategoriesState] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    categories: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      const data = await getCategories(token);
      setCategoriesState(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setPostData((prev) => ({
      ...prev,
      categories: checkedCategories,
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

      { categoriesState.map((category) => {
        const { name, id } = category;

        return (
          <label key={id} htmlFor={category}>
            <input
              id={category}
              type="checkbox"
              onChange={({ target }) => handleCheckboxChange(target, id)}
            />
            { name }
          </label>
        );
      }) }

    </Form>
  );
}

export default Create;
