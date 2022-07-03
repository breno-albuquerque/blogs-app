import { MDBInput } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import TogglePages from './TogglePages';

const Button = styled.button`
  text-decoration: none;
  width: 110px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #222466;
  color: white;
`;

const Div = styled.div`
  @media (max-width: 991px) {
    margin-top: 10vh;
  }
  @media (max-width: 360px) {
    margin-top: 12vh;
  }
`;

function RegisterComponent({ handleChange, userData, handleClick }) {
  const {
    email, password, displayName, image,
  } = userData;

  return (
    <section className="vh-100">
      <Toaster />
      <Header fixed />
      <Div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>

          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <TogglePages />
            <form>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Sign-up</p>
              </div>

              <div className="form-outline mb-4">
                <MDBInput
                  autoComplete="off"
                  onChange={handleChange}
                  value={displayName}
                  type="text"
                  name="displayName"
                  className="form-control form-control-lg"
                  label="Nick-name"
                />
              </div>

              <div className="form-outline mb-4">
                <MDBInput
                  autoComplete="off"
                  onChange={handleChange}
                  value={email}
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  label="Email"
                />
              </div>

              <div className="form-outline mb-3">
                <MDBInput
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  label="Password"
                  autoComplete="off"
                  onChange={handleChange}
                  value={password}
                  name="password"
                />
              </div>

              <div className="form-outline mb-4">
                <MDBInput
                  autoComplete="off"
                  onChange={handleChange}
                  value={image}
                  type="text"
                  name="image"
                  className="form-control form-control-lg"
                  label="Image"
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <Button
                  type="button"
                  onClick={handleClick}
                >
                  Sign-up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Div>
    </section>
  );
}

RegisterComponent.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  userData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RegisterComponent;
