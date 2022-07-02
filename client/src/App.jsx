import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import BlogPosts from './pages/BlogPosts';
import Home from './pages/Home';
import Publish from './pages/Publish';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/blogPosts" element={<BlogPosts />} />
      <Route exact path="/publish" element={<Publish />} />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
