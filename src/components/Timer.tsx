import React, { useState, useEffect, useCallback } from 'react'
import '../style/timer.css'

interface timerFunction{
    otpNumber:string
}

const Timer:React.FC<timerFunction> = (props) => {

    const [timer, setTimer] = useState(10);
    const decreasingTime = useCallback(() => setTimer(currentTime => currentTime - 1), []);

    useEffect(() => {
        timer > 0 && setTimeout(decreasingTime, 1000);
    }, [timer, decreasingTime]);

    const resetTimer = () => {
        if (!timer) {
            setTimer(10);  
        }
    };

    return (
        <>
            <div className="timer-text">
                <p>Time remaining : {timer}</p>
                { timer === 0 ? <button onClick={resetTimer}>Resend Otp</button>: ""}
            </div>
        </>
    )
}

export default Timer;
