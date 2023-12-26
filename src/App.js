import "./App.css";
// import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
// import ForgetPassword from './Pages/ForgetPassword';
// import Otp from './Pages/Otp';
// import ResetPassword from "./Pages/ResetPassword";
import formBanner from "./banner/form-banner.png";
// import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Login image={formBanner}/> */}
      <SignUp image = {formBanner}/>
      {/* <ForgetPassword image= {formBanner}/> */}
      {/* <Otp image={formBanner}/> */}
      {/* <ResetPassword image={formBanner} /> */}
    </div>
  );
}

export default App;
