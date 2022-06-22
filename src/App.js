import React, { useEffect } from "react";

import { getUsers, getBlogPosts, getCategories, register } from "./services/requests";

function App() {
  useEffect(() => {
    const fetchUsers = async () => {
      //  const users = await getUsers(2);
      //  const blogPosts = await getBlogPosts('Post');
      //  const categories = await getCategories();
      const token = await register();
      console.log(token)
    }

    fetchUsers();
  }, [])
  

  return (
    <h1>Hello from App</h1>
  );
}

export default App;
