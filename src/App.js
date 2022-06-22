import React, { useEffect } from "react";

import { getUsers, getBlogPosts, getCategories, register, login, publish  } from "./services/requests";

function App() {
  useEffect(() => {
    const fetchUsers = async () => {
      //  const users = await getUsers(2);
      //  const blogPosts = await getBlogPosts('Post');
      //  const categories = await getCategories();
      //  const token = await register();
      //  const token = await login();
      const publication = await publish()
      console.log(publication);
    }

    fetchUsers();
  }, [])
  

  return (
    <h1>Hello from App</h1>
  );
}

export default App;
