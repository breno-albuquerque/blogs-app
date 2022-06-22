import React, { useEffect } from "react";

import { getUsers } from "./services/requests";

function App() {
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();

    }

    fetchUsers();
  }, [])
  

  return (
    <h1>Hello from App</h1>
  );
}

export default App;
