import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { MDBInput } from 'mdb-react-ui-kit';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import { deleteBlogPost, getBlogPosts, like } from '../services/requests';
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

const Title = styled.h2`
  text-align: center;
  font-size: 26px;
  color: #222466;
  margin-top: 32px;
`;

function BlogPosts() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  const fetchPost = async () => {
    const data = await getBlogPosts(token);
    setPosts(data.reverse());
  };

  useEffect(() => {
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

  const handleLikeClick = async (postId) => {
    const data = await like(token, postId);

    if (data.code === 'ERR_BAD_REQUEST') {
      return toast(data.response.data.message);
    }

    await fetchPost();
    return null;
  };

  if (!token) return navigate('/');

  return (
    <>
      <Header />
      <Toaster />
      <Title>
        Posts Timeline
      </Title>
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
            handleLikeClick={handleLikeClick}
          />
        )) }
      </CardContainer>
    </>
  );
}

export default BlogPosts;
