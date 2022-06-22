import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { getUsers, getBlogPosts, getCategories, register, login, publish, createCategory  } from "./services/requests";

import BlogPosts from "./components/BlogPosts";
import Create from "./components/Create";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

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
    }

    fetchUsers();
  }, [])

  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/blogPosts" component={ BlogPosts } />
      <Route exact path="/create" component={ Create } />
    </Switch>
  );
}

export default App;
