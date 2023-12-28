import React, {useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";
import Timer from "../components/Timer";

interface formBannerProps {
  image: string;
 
}

const Otp: React.FC<formBannerProps> = (props) => {

  const input = useRef<HTMLInputElement>(null)

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const getotp = generateOtp();
  console.log(getotp, "getotp");

  const handleSubmitOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (input.current !== null) {
      const name = input.current.value;
      if (name === getotp) {
        console.log("otp matched");
      } else {
        console.log("enter correct otp")
      }
    }
  };



  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col form-wrapper">
            <div className="form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <div className="col-md-3 main-form">
              <Form>
                <h3 className="text-start">OTP verification</h3>
                <p className="otp-text">{getotp}</p>
                <div >
                  <Timer otpNumber={getotp}/>
                  
                </div>

                <Form.Group
                  className="mb-3 form-field"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter 6 digit OTP</Form.Label>
                  <Form.Control

                    type="text"
                    name="otp"
                    placeholder=""
                    ref={input}
                  />
                </Form.Group>



                <Button
                  onClick={handleSubmitOtp}
                  className="form-btn"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <div className="sign-up-link">
                  <p>
                    Not a member?
                    <span>
                      <Link to="/signUp"> Sign up</Link>
                    </span>
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

export default Otp;

