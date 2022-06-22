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
  }, [posts]);

  return (
    <div>BlogPosts</div>
  );
}

export default BlogPosts;
