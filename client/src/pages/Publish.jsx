import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MDBInput, MDBTextArea, MDBCheckbox } from 'mdb-react-ui-kit';
import toast, { Toaster } from 'react-hot-toast';
import {
  createCategory, edit, getCategories, publish,
} from '../services/requests';
import Header from '../components/Header';
import Load from '../components/Load';

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
`;

const Button = styled.button`
  text-decoration: none;
  width: 100%;
  max-width: 200px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  margin-top: 24px;
  background-color: #222466;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 26px;
  color: #222466;
  margin-bottom: 32px;
`;

function Publish() {
  const [isLoading, setIsloading] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState('');
  const [categoriesState, setCategoriesState] = useState();
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    categoryIds: [],
  });

  //  Pega as categorias da API
  const fetchCategories = async () => {
    const data = await getCategories(token);
    setCategoriesState(data);
  };

  useEffect(() => {
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

    if (name === 'category') return setCategory(value);

    return setPostData((prev) => ({
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

  const handlePostClick = async () => {
    if (location.state.editing) {
      setIsloading(true);
      const data = await edit(token, postData, location.state.id);
      setIsloading(false);
      if (data.code === 'ERR_BAD_REQUEST') {
        return toast(data.response.data.message);
      }
    } else {
      setIsloading(true);
      const data = await publish(token, postData);
      setIsloading(false);
      if (data.code === 'ERR_BAD_REQUEST') {
        return toast(data.response.data.message);
      }
    }
    return navigate('/blogPosts');
  };

  const handleCategoryClick = async () => {
    const data = await createCategory(token, category);

    if (data.code === 'ERR_BAD_REQUEST') {
      return toast(data.response.data.message);
    }

    setCategory('');
    await fetchCategories();
    return null;
  };

  const { title, content } = postData;

  if (!token) return navigate('/');

  return (
    <>
      <Header />
      <Toaster />

      {isLoading && <Load /> }

      {!isLoading && (
      <Form>
        <Title>Publish your Article!</Title>
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
          maxLength={255}
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
      && categoriesState.map((cat) => {
        const { name, id } = cat;

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
          onClick={handlePostClick}
        >
          { location.state.editing ? 'Edit' : 'Publish'}
        </Button>
      </Form>
      )}
      {(!location.state.editing && !isLoading) && (
      <Form>
        <Title>Create a new Category!</Title>
        <MDBInput
          autoComplete="off"
          type="text"
          name="category"
          value={category}
          label="New Category"
          onChange={handleChange}
        />
        <Button
          type="button"
          onClick={handleCategoryClick}
        >
          Create
        </Button>
      </Form>
      )}

    </>
  );
}

export default Publish;
