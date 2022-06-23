import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  text-decoration: none;
  width: 95%;
  padding: 10px;
  border: none;
  border-radius: 5px;

  color: ${(props) => props.active && 'white'};;
  background-color: ${(props) => props.active && '#222466'};
`;

function TogglePages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState({
    login: true,
    register: false,
  });

  useEffect(() => {
    const handleActiveButton = () => {
      if (location.state === 'login' || location.state === null) {
        setActive({
          login: true,
          register: false,
        });
      } else {
        setActive({
          login: false,
          register: true,
        });
      }
    };
    handleActiveButton();
  }, []);

  const handleRedirect = ({ target }) => {
    const { value } = target;

    navigate('/', { state: value });
  };

  return (
    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
      <li className="nav-item">
        <Button
          value="login"
          type="button"
          onClick={handleRedirect}
          active={active.login}
        >
          Login
        </Button>
      </li>
      <li className="nav-item">
        <Button
          value="register"
          onClick={handleRedirect}
          type="button"
          active={active.register}
        >
          Register
        </Button>
      </li>
    </ul>

  );
}

export default TogglePages;
