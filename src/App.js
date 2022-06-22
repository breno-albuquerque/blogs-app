import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { getUsers, getBlogPosts, getCategories, register, login, publish, createCategory  } from "./services/requests";

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
      <Route exact path="/" /* component={  } */ />
      <Route exact path="/register" /* component={  } */ />
      <Route exact path="/login" /* component={  } */ />
      <Route exact path="/blogPosts" /* component={  } */ />
      <Route exact path="/create" /* component={  } */ />
    </Switch>
  );
}

export default App;
