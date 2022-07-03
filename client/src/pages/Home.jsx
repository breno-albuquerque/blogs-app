import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
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
    const data = await register(userRegisterData);

    if (data.code === 'ERR_BAD_REQUEST') {
      return toast(data.response.data.message);
    }

    localStorage.setItem('token', data);
    return navigate('/blogPosts');
  };

  const handleLoginClick = async () => {
    const data = await login(userLoginData);

    if (data.code === 'ERR_BAD_REQUEST') {
      return toast(data.response.data.message);
    }

    localStorage.setItem('token', data);
    return navigate('/blogPosts');
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
