import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
/*   headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzcGxheU5hbWUiOiJMZXdpcyBIYW1pbHRvbiIsImVtYWlsIjoibGV3aXNoYW1pbHRvbkBnbWFpbC5jb20iLCJpYXQiOjE2NTU4OTc0NTl9.ui8LGF4MLOhJuH_K-qcHfeKFdE6WwH9r4tzGX6BVpuE' } */
});

const mockRegister = {
  displayName: 'Breno Albuquerque',
  email: 'breno@gmail.com',
  password: '123456',
  image: "http://myimage.com"
}

export const getUsers = async (id = null) => {
  let endpoint;

  if (id) endpoint = `/user/${id}`;
  else endpoint = '/user';

  const response = await instance.get(endpoint);
  return response.data;
}

export const getBlogPosts = async (q) => {
  let endpoint;

  if (q) endpoint = `/post/search?q=${q}`;
  else endpoint = '/post';

  const response = await instance.get(endpoint);
  return response.data;
}

export const getCategories = async () => {
  const response = await instance.get('/categories');
  return response.data;
}

export const register = async () => {
  const response = await instance.post('/user', mockRegister);
  return response.data.token;
}