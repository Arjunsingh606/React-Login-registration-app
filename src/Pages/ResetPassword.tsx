import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { resetPassword } from "../store/userSlice";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from 'react-router-dom';

interface ResetPasswordProps {
  image: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPass: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const userId = sessionStorage.getItem("userId") || "";

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationRules: Record<string, (value: string) => string> = {
    newPassword: (value) => {
      if (!value.trim()) {
        return "Password is required";
      } else {
        const checkNewPassword =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (!checkNewPassword.test(value)) {
          return "Passwords should be like 'Test@1324'";
        }
      }
      return "";
    },
    confirmPass: (value) => {
      if (!value.trim()) {
        return "Password is required";
      }
      if (value !== formData.newPassword) {
        return "Password do not match";
      }
      return "";
    },
  };

  const validateField = (fieldName: string, value: string) => {
    const error = validationRules[fieldName](value);
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    validateField(fieldName, value);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach((field) => {
      const key = field as keyof typeof formData;
      const error = validationRules[key](formData[key]);
      newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(resetPassword({ userId, confirmPass: formData.confirmPass }));
        alert("Password changed successfully");
        navigate('/');
      } catch (error) {
        console.error("Password reset failed", error);
      }
    }
  };

  return (
    <>
      <div className="container-fluid form-body">
        <div className="row user-form">
          <div className="col-md-6 form-size form-banner">
            <div className="form-banner">
              <img className="img-fluid" src={props.image} alt="loading" />
            </div>
          </div>
          <div className="col-md-4 form-size">
            <div className="main-form">
              <Form onSubmit={handleSubmit}>
                <h3 className="text-start">Reset Password</h3>

                <Form.Group
                  className={`mb-3 form-field ${errors.newPassword ? "has-error" : ""}`}
                  controlId="formBasicPassword"
                >
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    placeholder=""
                    value={formData.newPassword}
                    onChange={(e) =>
                      handleFieldChange("newPassword", e.target.value)
                    }
                    onBlur={() => validateField("newPassword", formData.newPassword)}
                  />
                  <span className="error-text">{errors.newPassword}</span>
                </Form.Group>

                <Form.Group
                  className={`mb-3 form-field ${errors.confirmPass ? "has-error" : ""}`}
                  controlId="formBasicPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPass"
                    placeholder=""
                    value={formData.confirmPass}
                    onChange={(e) =>
                      handleFieldChange("confirmPass", e.target.value)
                    }
                    onBlur={() => validateField("confirmPass", formData.confirmPass)}
                  />
                  <span className="error-text">{errors.confirmPass}</span>
                </Form.Group>

                <Button className="form-btn" variant="primary" type="submit">
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













// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { resetPassword } from "../store/userSlice";
// import { useAppDispatch } from "../store/hooks";
// import { useNavigate } from 'react-router-dom';

// interface ResetPasswordProps {
//   image: string;
// }

// const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
//   const [newPassword, setNewPassword] = useState<string>("");
//   const [confirmPass, setConfirmPass] = useState<string>("");
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const userId = sessionStorage.getItem("userId") || "";

//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!newPassword.trim()) {
//       newErrors.newPassword = "Password is required";
//     } else {
//       const checkNewPassword =
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
//       if (!checkNewPassword.test(newPassword)) {
//         newErrors.newPassword = "Passwords should be like 'test@example.com'";
//       }
//     }
//     if (!confirmPass.trim()) {
//       newErrors.confirmPass = "Password is required";
//     }
//     if (newPassword !== confirmPass) {
//       newErrors.confirmPass = "Password do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleFieldChange = (fieldName: string, value: string) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
//     switch (fieldName) {
//       case "newPassword":
//         setNewPassword(value);
//         break;
//       case "confirmPass":
//         setConfirmPass(value);
//         break;

//       default:
//         break;
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (validateForm()) {
//       try {
//         await dispatch(resetPassword({ userId, confirmPass }));
//         alert("Password changed successfully");
//         navigate('/');
//       } catch (error) {
//         console.error("Password reset failed", error);
//       }
//     }
//   };

//   return (
//     <>
//        <div className="container-fluid form-body">
//         <div className="row user-form">
//           <div className="col-md-6 form-size form-banner">
//             <div className="form-banner">
//               <img className="img-fluid" src={props.image} alt="loading" />
//             </div>
//           </div>
//           <div className="col-md-4 form-size">
//           <div className=" main-form">
//               <Form onSubmit={handleSubmit}>
//                 <h3 className="text-start">Reset Password</h3>

//                 <Form.Group className="mb-3 form-field">
//                   <Form.Label>New Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="new-password"
//                     placeholder=""
//                     value={newPassword}
//                     onChange={(e) =>
//                       handleFieldChange("newPassword", e.target.value)
//                     }
//                   />
//                   <span className="error-text">{errors.newPassword}</span>
//                 </Form.Group>

//                 <Form.Group className="mb-3 form-field">
//                   <Form.Label>Confirm Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="confirm-password"
//                     placeholder=""
//                     value={confirmPass}
//                     onChange={(e) =>
//                       handleFieldChange("confirmPass", e.target.value)
//                     }
//                   />
//                   <span className="error-text">{errors.confirmPass}</span>
//                 </Form.Group>

//                 <Button className="form-btn" variant="primary" type="submit">
//                   Submit
//                 </Button>

//                 <div className="sign-up-link">
//                   <p>
//                     Not a member?
//                     <span>
//                       <Link to="/signUp"> Sign up</Link>
//                     </span>
//                   </p>
//                 </div>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResetPassword;
