import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";


const Otp = (props) => {
  return (
    <>
     <div className="container ">
        <div className="row">
          <div className="form-wrapper">
            <div className="col-md-5 form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <Form className=" col-md-4">
              <h3 className="text-start">OTP verification</h3>
           
              <Form.Group
                className="mb-3 form-field"
                controlId="formBasicEmail"
              >
                <Form.Label>Enter 6 digit OTP</Form.Label>
                <Form.Control type="text" name="otp"  placeholder=""/>
              </Form.Group>
              
              <Button className="form-btn" variant="primary" type="submit">
                Submit
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

export default Otp;
