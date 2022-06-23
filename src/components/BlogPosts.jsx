import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { deleteBlogPost, getBlogPosts } from '../services/requests';
import Header from './Header';

function BlogPosts() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getBlogPosts(token);
      setPosts(data);
    };

    fetchPost();
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSearchClick = async () => {
    const data = await getBlogPosts(token, search);
    setPosts(data);
    setSearch('');
  };

  const handleAllClick = async () => {
    const data = await getBlogPosts(token);
    setPosts(data);
    setSearch('');
  };

  const handleRemoveClick = async () => {
    await deleteBlogPost(token, decoded.id);
    await handleAllClick();
  };

  const handleEditClick = async (id) => {
    navigate('/publish', { state: { editing: true, id } });
  };

  if (!token) return navigate('/');

  return (
    <div>
      <Header />
      <form>
        <input
          onChange={handleChange}
          type="text"
          name="search"
          value={search}
        />
        <button
          type="button"
          onClick={handleSearchClick}
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleAllClick}
        >
          All
        </button>
      </form>

      { posts && posts.map((post, index) => {
        const {
          id, title, content, userId, published, updated, user, categories,
        } = post;
        const { displayName, email, image } = user;

        return (
          <article key={id} id={id}>
            <h3>{ title }</h3>
            { categories.map((category) => (
              <span key={category.id}>
                { category.name }
                {' '}
              </span>
            )) }
            <p>
              {' '}
              { content }
              {' '}
            </p>
            <p>{ displayName }</p>
            <img width={100} alt="profile user" src={image} />
            { userId === decoded.id && (
              <div>
                <button
                  type="button"
                  onClick={handleRemoveClick}
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => handleEditClick(id)}
                >
                  Edit
                </button>
              </div>
            ) }
          </article>
        );
      }) }
    </div>
  );
}

export default BlogPosts;
