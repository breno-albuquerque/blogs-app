import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/requests';
import './Login.css';
import LoginComponent from '../components/LoginComponent';

function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    const token = await login(userData);
    localStorage.setItem('token', token);
    navigate('/blogPosts');
  };

  return (
    <LoginComponent
      handleChange={handleChange}
      handleClick={handleClick}
      userData={userData}
    />
  );
}

export default Login;
