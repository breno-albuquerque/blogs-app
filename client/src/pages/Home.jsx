import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login, register } from '../services/requests';
import '../styles/Login.css';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';

function Login() {
  const [isLoading, setIsloading] = useState(false);
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
    setIsloading(true);
    const data = await register(userRegisterData);
    setIsloading(false);

    if (data.code === 'ERR_BAD_REQUEST') {
      return toast(data.response.data.message);
    }

    localStorage.setItem('token', data);
    return navigate('/blogPosts');
  };

  const handleLoginClick = async () => {
    setIsloading(true);
    const data = await login(userLoginData);
    setIsloading(false);

    if (data.code === 'ERR_BAD_REQUEST') {
      return toast(data.response.data.message);
    }

    localStorage.setItem('token', data);
    return navigate('/blogPosts');
  };

  if (location.state === null || location.state === 'login') {
    return (
      <LoginComponent
        isLoading={isLoading}
        handleChange={handleLoginChange}
        handleClick={handleLoginClick}
        userData={userLoginData}
      />
    );
  }
  return (
    <RegisterComponent
      isLoading={isLoading}
      handleChange={handleRegisterChange}
      handleClick={handleRegisterClick}
      userData={userRegisterData}
    />
  );
}

export default Login;
