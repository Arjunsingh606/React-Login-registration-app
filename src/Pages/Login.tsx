import React, {useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../store/store'
import { getUsers } from "../store/userSlice";
import { useAppDispatch } from "../store/hooks";

interface formBannerProps {
  image: string;
}

const Login: React.FC<formBannerProps> = (props) => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data, status } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const user = data.find((user) => user.email === email && user.password === password);
  console.log(user, "hfjsgfjsgfjh");

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
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else {
      const checkPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if (!checkPassword.test(password)) {
        newErrors.password = "Enter correct password";
      }
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
      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };


  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm()) {
      if (user) {
        console.log("fjhdjkhfgdjkfhjdghjk");
        sessionStorage.setItem("userEmail", email)
        sessionStorage.setItem("UserPassword", password);
        window.location.href = "/home";
      } else {
        console.log("Invalid password")
      }
    }
    await dispatch(getUsers());
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
              <Form >
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
                    value={email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                  <span className="error-text">{errors.email}</span>
                </Form.Group>

                <Form.Group
                  className="mb-3 form-field"
                  controlId="formBasicPassword"
                >
                  <div className="password-title">
                    <Form.Label>Password</Form.Label>
                    <p>
                      <Link to="/forgetPassword"> Forget Password?</Link>
                    </p>
                  </div>

                  <Form.Control
                    type="password"
                    name="password"
                    placeholder=""
                    value={password}
                    onChange={(e) => handleFieldChange("password", e.target.value)}
                  />
                  <span className="error-text">{errors.password}</span>
                </Form.Group>

                <Button onClick={handleLogin} className="form-btn" variant="primary" type="submit">
                  Login
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

export default Login;





























// import React from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import "../style/login.css";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// interface formBannerProps {
//   image: string;
// }
// const Login: React.FC<formBannerProps> = (props) => {

//   const [email, setEmail] = useState<string>("")
//   const [password, setPassword] = useState<string>("")

//   return (
//     <>
//       <div className="container-fuild ">
//         <div className="row">
//           <div className="col form-wrapper">
//             <div className=" form-banner">
//               <img src={props.image} alt="loading"></img>
//             </div>
//             <div className="col-md-3 main-form">
//               <Form >
//                 <h3 className="text-start">Login</h3>
//                 <p className="text-start border-bottom">
//                   Enter your credentials to access your account
//                 </p>
//                 <Form.Group
//                   className="mb-3 form-field"
//                   controlId="formBasicEmail"
//                 >
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="xyz@gmail.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group
//                   className="mb-3 form-field"
//                   controlId="formBasicPassword"
//                 >
//                   <div className="password-title">
//                     <Form.Label>Password</Form.Label>
//                     <p>
//                       <Link to="/forgetPassword"> Forget Password?</Link>
//                     </p>
//                   </div>

//                   <Form.Control
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Button className="form-btn" variant="primary" type="submit">
//                   Login
//                 </Button>
//                 <div className="sign-up-link">
//                   <p>
//                     Not a member?
//                     <span><Link to="/signUp"> Sign up</Link></span>
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

// export default Login;
