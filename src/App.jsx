import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  getUsers, getBlogPosts, getCategories, register, login, publish, createCategory,
} from './services/requests';

import BlogPosts from './components/BlogPosts';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Publish from './components/Publish';

function App() {
  useEffect(() => {
    const fetchUsers = async () => {
      //  const users = await getUsers(2);
      //  const blogPosts = await getBlogPosts('Post');
      //  const categories = await getCategories();
      //  const token = await register();
      //  const token = await login();
      //  const publication = await publish()
      //  const category = await createCategory();
    };

    fetchUsers();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/blogPosts" element={<BlogPosts />} />
      <Route exact path="/publish" element={<Publish />} />
    </Routes>
  );
}

export default App;
