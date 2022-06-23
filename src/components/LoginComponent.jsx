import React from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import TogglePages from './TogglePages';
import Header from './Header';

function LoginComponent({ handleChange, userData, handleClick }) {
  const { email, password } = userData;

  return (
    <section className="vh-100">
      <Header />
      <div className="container-fluid h-custom">
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
                <p className="text-center fw-bold mx-3 mb-0">Sign-in</p>
              </div>

              <div className="form-outline mb-4">
                <MDBInput
                  autoComplete="off"
                  onChange={handleChange}
                  value={email}
                  type="email"
                  name="email"
                  id="form3Example3"
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

              <div className="text-center text-lg-start mt-4 pt-2">
                <MDBBtn
                  type="button"
                  onClick={handleClick}
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </MDBBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginComponent;
