import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../style/login.css'
import { Link } from "react-router-dom";
import { getUsers } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store'
import { useAppDispatch} from "../store/hooks";

interface FormBannerProps {
  image: string;
}

const ForgetPassword: React.FC<FormBannerProps> = (props) => {


  const [email, setEmail] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data, status } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch()
  
  const existEmail = data.find((user) => user.email === email);
  console.log(existEmail, "logged in user");
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const checkEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!checkEmail.test(String(email).toLowerCase())) {
        newErrors.email = "Invalid format of  email address ";
      }
      // if(!existEmail){
      //   newErrors.email = "Email is not registered ! please signup !!!";
      // }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleFieldChange = (fieldName: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    switch (fieldName) {
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };



  const handelSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(validateForm()){
      await dispatch(getUsers()); 
      if (existEmail) {
        sessionStorage.setItem("forgetPassEmail", email)
        window.location.href = "/otp";
      }else{
        console.log("no email found");
      }
    }
  }

  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col form-wrapper">
            <div className="form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <div className="col-md-3 main-form">
              <Form>
                <h3 className="text-start">Forget Your Password</h3>
                <p className="text-start border-bottom">
                  Enter the email address associated with your account and We'll
                  help you to reset password.
                </p>
                <Form.Group className="mb-3 form-field">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                   <span className="error-text">{errors.email}</span>
                </Form.Group>
                <Button onClick={handelSubmit} className="form-btn" variant="primary" type="submit">
                  Submit
                </Button>
                <div className="sign-up-link">
                  <p>Not a member?
                    <span><Link to="/signUp"> Sign up</Link></span>
                  </p>
                </div>
              </Form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;









