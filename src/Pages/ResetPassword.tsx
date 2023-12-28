import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css"
import { Link } from "react-router-dom";

interface formBannerProps{
  image:string
}


const ResetPassword:React.FC<formBannerProps>= (props) => {

  const[newPass, setNewPass] = useState<string>("")
  const[confirmPass, setConfirmPass] = useState<string>("")

  console.log(newPass, "new password");
  console.log(confirmPass, "confirm")

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col form-wrapper">
            <div className=" form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <div className="col-md-3 main-form">
            <Form >
              <h3 className="text-start">Reset Password</h3>

              <Form.Group
                className="mb-3 form-field"
              >
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="text"
                  name="reset-password"
                  placeholder=""
                  value={newPass}
                  onChange={(e)=> setNewPass(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-field"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="text"
                  name="reset-password"
                  placeholder=""
                  value={confirmPass}
                  onChange={(e)=> setConfirmPass(e.target.value)}
                />
              </Form.Group>

              <Button className="form-btn" variant="primary" type="submit">
                Submit
              </Button>
              <div className="sign-up-link">
                <p>
                  Not a member?
                 
                   <span><Link to="/signUp"> Sign up</Link></span>
                 
                </p>
              </div>
            </Form>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
