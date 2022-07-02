import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { MDBInput } from 'mdb-react-ui-kit';
import styled from 'styled-components';
import { deleteBlogPost, getBlogPosts } from '../services/requests';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';

const Form = styled.form`
  padding: 24px;
`;

const CardContainer = styled.div`
  padding: 16px;
`;

const Button = styled.button`
  text-decoration: none;
  max-width: 200px;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 16px;
  margin-right: 16px;
  
  color: white;
  background-color: #222466;
`;

function BlogPosts() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getBlogPosts(token);
      setPosts(data.reverse());
    };

    fetchPost();
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSearchClick = async () => {
    const data = await getBlogPosts(token, search);
    setPosts(data.reverse());
    setSearch('');
  };

  const handleAllClick = async () => {
    const data = await getBlogPosts(token);
    setPosts(data.reverse());
    setSearch('');
  };

  const handleRemoveClick = async (id) => {
    await deleteBlogPost(token, id);
    await handleAllClick();
  };

  const handleEditClick = async (id) => {
    navigate('/publish', { state: { editing: true, id } });
  };

  if (!token) return navigate('/');

  return (
    <>
      <Header />

      <Form>
        <MDBInput
          onChange={handleChange}
          type="text"
          name="search"
          value={search}
          label="Search Post"
        />
        <Button
          type="button"
          onClick={handleSearchClick}
        >
          Search
        </Button>
        <Button
          type="button"
          onClick={handleAllClick}
        >
          See All
        </Button>
      </Form>

      <CardContainer>
        { posts && posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            decodedId={decoded.id}
            handleEditClick={handleEditClick}
            handleRemoveClick={handleRemoveClick}
          />
        )) }
      </CardContainer>
    </>
  );
}

export default BlogPosts;
