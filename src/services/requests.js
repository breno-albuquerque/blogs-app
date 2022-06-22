import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzcGxheU5hbWUiOiJMZXdpcyBIYW1pbHRvbiIsImVtYWlsIjoibGV3aXNoYW1pbHRvbkBnbWFpbC5jb20iLCJpYXQiOjE2NTU4OTc0NTl9.ui8LGF4MLOhJuH_K-qcHfeKFdE6WwH9r4tzGX6BVpuE' }
})

export const getUsers = async () => {
  const response = await instance.get('/user');
  console.log(response)
  return response.data;
}