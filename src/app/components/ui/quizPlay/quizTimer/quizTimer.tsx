
import { QuizTimerProps } from "@/types";
import { FC, useEffect, useState } from "react";




const QuizTimer: FC<QuizTimerProps> = ({ initialTime, onTimeEnd }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime * 60); 

    useEffect(()=>{
        setTimeLeft(initialTime * 60);
    }, [initialTime]);

    useEffect(()=>{
        if(timeLeft <= 0 ){
            onTimeEnd();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, onTimeEnd]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
         <div className="text-gray-700 font-semibold">
            Time left: {minutes}:{seconds}
        </div>
    )
}

export default QuizTimer;