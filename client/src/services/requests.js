import axios from 'axios';
import handleError from '../helpers/handleError';

const makeInstance = (token) => {
  const instanceToken = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: { authorization: token },
  });

  return instanceToken;
};

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const getUsers = async (id = null) => {
  try {
    let endpoint;

    if (id) endpoint = `/user/${id}`;
    else endpoint = '/user';

    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getBlogPosts = async (token, q = null) => {
  try {
    let endpoint;

    if (q) endpoint = `/post/search?q=${q}`;
    else endpoint = '/post';

    const instanceToken = makeInstance(token);
    const response = await instanceToken.get(endpoint);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCategories = async (token) => {
  try {
    const instanceToken = makeInstance(token);
    const response = await instanceToken.get('/categories');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const register = async (userData) => {
  try {
    const response = await instance.post('/user', userData);
    return response.data.token;
  } catch (error) {
    return handleError(error);
  }
};

export const login = async (userData) => {
  try {
    const response = await instance.post('/login', userData);
    return response.data.token;
  } catch (error) {
    return handleError(error);
  }
};

export const publish = async (token, postData) => {
  try {
    const instanceToken = makeInstance(token);
    const response = await instanceToken.post('/post', postData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const edit = async (token, postData, id) => {
  try {
    const instanceToken = makeInstance(token);

    const editData = {
      title: postData.title,
      content: postData.content,
    };

    const response = await instanceToken.put(`/post/${id}`, editData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createCategory = async (token, category) => {
  try {
    const instanceToken = makeInstance(token);
    const response = await instanceToken.post('/categories', { name: category });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteBlogPost = async (token, userId) => {
  try {
    const instanceToken = makeInstance(token);
    const response = await instanceToken.delete(`/post/${userId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
