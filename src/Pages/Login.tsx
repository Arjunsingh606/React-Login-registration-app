import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, UserForm } from "../store/userSlice";
import { RootState } from '../store/store'

interface formBannerProps {
  image: string;
}
const Login: React.FC<formBannerProps> = (props) => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const loggedIn = useSelector((state: RootState) => state.user.status === "succeeded");
  const dispatch = useDispatch();


  const handleLogin = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
   
     dispatch(login( {email,password}));
    
    if (loggedIn) {
      sessionStorage.setItem("userEmail", email)
      sessionStorage.setItem("UserPassword", password);
      window.location.href = "/home";
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
