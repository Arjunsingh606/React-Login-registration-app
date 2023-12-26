import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";

const Login = (props) => {
  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="form-wrapper">
            <div className="col-md-5 form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <Form className=" col-md-4">
              <h3 className="text-start">Login</h3>
              <p className="text-start border-bottom">
                Enter your credentials to access your account
              </p>
              <Form.Group
                className="mb-3 form-field"
                controlId="formBasicEmail"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="xyz@gmail.com"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-field"
                controlId="formBasicPassword"
              >
                <div className="password-title">
                  <Form.Label>Password</Form.Label>
                  <p>
                    <a href="forget.html" class="link-underline-light">
                      Forget Password?
                    </a>
                  </p>
                </div>

                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Button className="form-btn" variant="primary" type="submit">
                Login
              </Button>
              <div className="sign-up-link">
                <p >
                  Not a member?
                  <a href="forget.html" class="link-underline-light ">
                    Sign up now
                  </a>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
