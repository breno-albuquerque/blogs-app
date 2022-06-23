import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function TogglePages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState({
    login: 'nav-link active',
    register: 'nav-link',
  });

  useEffect(() => {
    const handleActiveButton = () => {
      if (location.state === 'login' || location.state === null) {
        setActive({
          login: 'nav-link active',
          register: 'nav-link',
        });
      } else {
        setActive({
          login: 'nav-link',
          register: 'nav-link active',
        });
      }
    };
    handleActiveButton();
  }, []);

  const handleRedirect = ({ target }) => {
    const { value } = target;

    navigate('/', { state: value });
  };

  const { login, register } = active;

  return (
    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          value="login"
          style={{ width: '100%' }}
          type="button"
          onClick={handleRedirect}
          className={login}
          id="tab-login"
          role="tab"
        >
          Login
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          value="register"
          onClick={handleRedirect}
          style={{ width: '100%' }}
          type="button"
          className={register}
          id="tab-register"
        >
          Register
        </button>
      </li>
    </ul>

  );
}

export default TogglePages;
