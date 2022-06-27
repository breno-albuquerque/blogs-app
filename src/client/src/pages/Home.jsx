import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, register } from '../services/requests';
import '../styles/Login.css';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userRegisterData, setUserRegisterData] = useState({
    displayName: '',
    email: '',
    password: '',
    image: '',
  });

  const [userLoginData, setUserLoginData] = useState({
    email: '',
    password: '',
  });

  const handleRegisterChange = ({ target }) => {
    const { name, value } = target;

    setUserRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = ({ target }) => {
    const { name, value } = target;

    setUserLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterClick = async () => {
    const token = await register(userRegisterData);
    localStorage.setItem('token', token);
    navigate('/blogPosts');
  };

  const handleLoginClick = async () => {
    const token = await login(userLoginData);
    localStorage.setItem('token', token);
    navigate('/blogPosts');
  };

  if (location.state === null || location.state === 'login') {
    return (
      <LoginComponent
        handleChange={handleLoginChange}
        handleClick={handleLoginClick}
        userData={userLoginData}
      />
    );
  }
  return (
    <RegisterComponent
      handleChange={handleRegisterChange}
      handleClick={handleRegisterClick}
      userData={userRegisterData}
    />
  );
}

export default Login;
