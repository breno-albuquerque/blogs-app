import React, { useEffect, useState } from 'react';
import { getBlogPosts } from '../services/requests';

function BlogPosts() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
    const data = await getBlogPosts(token, search);
    setPosts(data);
  };

  const handleAllClick = async () => {
    const token = localStorage.getItem('token');
    const data = await getBlogPosts(token);
    setPosts(data);
  };

  return (
    <div>
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
            <p>
              {' '}
              { content }
              {' '}
            </p>
            <p>{ displayName }</p>
            <img width={100} alt="profile user" src={image} />
          </article>
        );
      }) }
    </div>
  );
}

export default BlogPosts;
