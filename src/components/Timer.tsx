// Timer component
import React, { useState, useEffect, useCallback } from "react";
import "../style/timer.css";

interface TimerProps {
  otpNumber: () => void;
  otpDigit: string;
  onExpire: () => void;
}

const Timer: React.FC<TimerProps> = ({ otpNumber, otpDigit, onExpire }) => {
  const [timer, setTimer] = useState(10);

  const decreasingTime = useCallback(() => {
    setTimer((currentTime) => currentTime - 1);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setTimeout(decreasingTime, 1000);
      return () => clearTimeout(timerId);
    } else {
      onExpire(); // Call the onExpire callback when the timer expires
    }
  }, [timer, decreasingTime, onExpire]);

  return (
    <>
      <div className="timer-text">
        {timer > 0 && <p className="otp-text">{otpDigit}</p>}
        {timer > 0 && <p>Time remaining: {timer}</p>}
      </div>
      <div className="otp-btn">
        {timer === 0 && <button onClick={otpNumber}>Resend Otp</button>}
      </div>
    </>
  );
};

export default Timer;







// import React, { useState, useEffect, useCallback } from "react";
// import "../style/timer.css";


// interface TimerProps {
//   otpNumber: () => void;
//   otpDigit: string;
// }

// const Timer: React.FC<TimerProps> = ({ otpNumber, otpDigit }) => {
//   const [timer, setTimer] = useState(8);

//   const decreasingTime = useCallback(() => {
//     setTimer((currentTime) => currentTime - 1);
//   }, []);

//   useEffect(() => {
//     if (timer > 0) {
//       const timerId = setTimeout(decreasingTime, 1000);
//       return () => clearTimeout(timerId);
//     }
//   }, [timer, decreasingTime]);

//   const resetTimer = () => {
//     setTimer(8); 
//     otpNumber(); 
//   };

//   return (
//     <>
//       <div className="timer-text">
//         {timer > 0 && <p className="otp-text">{otpDigit}</p>}
//         {timer > 0 && <p>Time remaining: {timer}</p>}
//       </div>
//       <div className="otp-btn">
//         {timer === 0 && (
//           <button onClick={resetTimer}>Resend Otp</button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Timer;
