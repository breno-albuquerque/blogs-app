import React from 'react';
import { useNavigate } from 'react-router-dom';

function TogglePages() {
  const navigate = useNavigate();

  const handleRedirect = ({ target }) => {
    const { value } = target;

    navigate(`/${value}`, { state: value });
  };

  return (
    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          value="login"
          style={{ width: '100%' }}
          type="button"
          onClick={handleRedirect}
          className="nav-link active"
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
          className="nav-link"
          id="tab-register"
        >
          Register
        </button>
      </li>
    </ul>

  );
}

export default TogglePages;
