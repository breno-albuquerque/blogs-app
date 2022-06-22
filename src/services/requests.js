import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzcGxheU5hbWUiOiJMZXdpcyBIYW1pbHRvbiIsImVtYWlsIjoibGV3aXNoYW1pbHRvbkBnbWFpbC5jb20iLCJpYXQiOjE2NTU4OTc0NTl9.ui8LGF4MLOhJuH_K-qcHfeKFdE6WwH9r4tzGX6BVpuE' }
})

export const getUsers = async (id = null) => {
  let endpoint;

  if (id) endpoint = `/user/${id}`;
  else endpoint = '/user';

  const response = await instance.get(endpoint);
  console.log(response)
  return response.data;
}

export const getBlogPosts = async (q) => {
  let endpoint;

  if (q) endpoint = `/post/search?q=${q}`;
  else endpoint = '/post';

  const response = await instance.get(endpoint);
  console.log(response);
}

export const getCategories = async () => {
  const response = await instance.get('/categories');

  console.log(response);

  return response;
}
