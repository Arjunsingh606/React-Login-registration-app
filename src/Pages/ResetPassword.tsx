import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { RootState } from "../store/store";
import { updatePassword,getUsers } from "../store/userSlice";

interface formBannerProps {
  image: string;
}

const ResetPassword: React.FC<formBannerProps> = (props) => {
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const { data, status } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers]);

  const userEmail = sessionStorage.getItem("userEmail");

  const user = data.find((user) => user.email === userEmail);
  console.log(user);
  
   
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!newPass.trim()) {
      newErrors.newPass = "Password is required";
    } else {
      const checkPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if (!checkPassword.test(newPass)) {
        newErrors.newPass = "Enter correct password";
      }
    }
    if (!confirmPass ) {
      newErrors.confirmPass = "Password is required";
    }
    if (confirmPass !== newPass) {
      newErrors.confirmPass = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleFieldChange = (fieldName: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    switch (fieldName) {
      case "newPass":
        setNewPass(value);
        break;
      case "confirmPass":
        setConfirmPass(value);
        break;
      default:
        break;
    }
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // await dispatch(updatePassword());
      if (user) {
        window.location.href = "/home";
      } else {
        console.log("Invalid password");
      }
    }
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col form-wrapper">
            <div className=" form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <div className="col-md-3 main-form">
              <Form>
                <h3 className="text-start">Reset Password</h3>

                <Form.Group
                  className="mb-3 form-field"
                  controlId="formBasicPassword1"
                >
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=""
                    value={newPass}
                    autoComplete="on"
                    onChange={(e) =>
                      handleFieldChange("newPass", e?.target?.value)
                    }
                  />
                  <span className="error-text">{errors.newPass}</span>
                </Form.Group>

                <Form.Group
                  className="mb-3 form-field"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=""
                    autoComplete="confirm-password"
                    value={confirmPass}
                    onChange={(e) => handleFieldChange("confirmPass", e.target.value) }
                  />
                   <span className="error-text">{errors.confirmPass}</span>
                </Form.Group>

                <Button
                  onClick={handleUpdate}
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

export default ResetPassword;
