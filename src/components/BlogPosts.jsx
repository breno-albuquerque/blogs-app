import React, { useEffect, useState } from 'react';
import { getBlogPosts } from '../services/requests';

function BlogPosts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      const data = await getBlogPosts(token);
      setPosts(data);
    };

    fetchPost();
  }, []);

  return (
    <div>
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
