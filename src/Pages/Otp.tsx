// Otp component
import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";
import Timer from "../components/Timer";
import { useNavigate } from 'react-router-dom';

interface formBannerProps {
  image: string;
}

const Otp: React.FC<formBannerProps> = (props) => {
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const [otpDigit, setOtpDigit] = useState(generateOtp());
  const [otpExpired, setOtpExpired] = useState(false);

  const handleSubmitOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!otpExpired && input.current !== null) {
      const name = input.current.value;
      if (name === otpDigit) {
        navigate('/resetPassword');
      } else {
        alert("Enter correct otp");
      }
    } else {
      alert("OTP has expired. Please resend.");
    }
  };

  const handleResendOtp = () => {
    setOtpDigit(generateOtp());
    setOtpExpired(false);
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
           <div className=" main-form">
               <Form>
                 <h3 className="text-start">OTP verification</h3>
                
                 <div>
                 <Timer otpDigit={otpDigit} otpNumber={handleResendOtp} onExpire={() => setOtpExpired(true)} />
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
                  // value={otp}
                  // onChange={otpValue}
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










// import React, { useRef, useState, useCallback, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import "../style/login.css";
// import { Link } from "react-router-dom";
// import Timer from "../components/Timer";
// import { useNavigate } from 'react-router-dom';

// interface formBannerProps {
//   image: string;
// }
// // export interface GetOtp {
// //   getOtp: string | undefined;
// // }
// const Otp: React.FC<formBannerProps> =(props) => {
//   const input = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();
  
//   const generateOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };
//   const [otpDigit, setOtpDigit] = useState(generateOtp());


//   const handleSubmitOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     if (input.current !== null) {
//       const name = input.current.value;
//       if (name === otpDigit) {
//         navigate('/resetPassword');
//       } else {
//         alert("Enter correct otp");
//       }
//     }
//   };
//   const handleResendOtp = () => {
//     setOtpDigit(generateOtp());
//   };

//   return (
//     <>
//      <div className="container-fluid form-body">
//         <div className="row user-form">
//           <div className="col-md-6 form-size form-banner">
//             <div className="form-banner">
//               <img className="img-fluid" src={props.image} alt="loading" />
//             </div>
//           </div>
//           <div className="col-md-4 form-size">
//           <div className=" main-form">
//               <Form>
//                 <h3 className="text-start">OTP verification</h3>
                
//                 <div>
//                   <Timer otpDigit={otpDigit} otpNumber={handleResendOtp} />
//                 </div>


//                 <Form.Group
//                   className="mb-3 form-field"
//                   controlId="formBasicEmail"
//                 >
//                   <Form.Label>Enter 6 digit OTP</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="otp"
//                     placeholder=""
//                     ref={input}
//                   // value={otp}
//                   // onChange={otpValue}
//                   />
//                 </Form.Group>

//                 <Button
//                   onClick={handleSubmitOtp}
//                   className="form-btn"
//                   variant="primary"
//                   type="submit"
//                 >
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

// export default Otp;
