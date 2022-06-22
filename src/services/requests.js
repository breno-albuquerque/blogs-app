import axios from 'axios';

const makeInstance = (token) => {
  const instanceToken = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { authorization: token },
  });

  return instanceToken;
};

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

/* const mockRegister = {
  displayName: 'Breno Albuquerque',
  email: 'breno@gmail.com',
  password: '123456',
  image: 'http://myimage.com',
}; */

/* const mockLogin = {
  email: 'breno@gmail.com',
  password: '123456',
}; */

/* const mockPublish = {
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
  categoryIds: [1, 2],
}; */

/* const mockCategories = {
  name: 'Typescript',
}; */

export const getUsers = async (id = null) => {
  let endpoint;

  if (id) endpoint = `/user/${id}`;
  else endpoint = '/user';

  const response = await instance.get(endpoint);
  return response.data;
};

export const getBlogPosts = async (token, q = null) => {
  let endpoint;

  if (q) endpoint = `/post/search?q=${q}`;
  else endpoint = '/post';

  const instanceToken = makeInstance(token);
  const response = await instanceToken.get(endpoint);
  return response.data;
};

export const getCategories = async (token) => {
  const instanceToken = makeInstance(token);
  const response = await instanceToken.get('/categories');
  return response.data;
};

export const register = async (userData) => {
  const response = await instance.post('/user', userData);
  return response.data.token;
};

export const login = async (userData) => {
  const response = await instance.post('/login', userData);
  return response.data.token;
};

export const publish = async (token, postData) => {
  console.log(postData);
  const instanceToken = makeInstance(token);
  const response = await instanceToken.post('/post', postData);
  return response.data;
};

export const createCategory = async (token, category) => {
  const instanceToken = makeInstance(token);
  const response = await instanceToken.post('/categories', { name: category });
  return response.data;
};
