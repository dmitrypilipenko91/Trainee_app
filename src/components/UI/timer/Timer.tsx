import classes from './Timer.module.css';
import { useEffect, useState } from 'react';

function formatTime(seconds: number) {
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

let timerInterval: number;

const Timer: React.FC = () => {
  const [timerTime, setTimerTime] = useState(60);
  const [timerOutput, setTimerOutput] = useState(formatTime(timerTime));

  const startTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      setTimerTime((prevTime) => {
        if (prevTime > 0) {
          setTimerOutput(formatTime(prevTime - 1));
          return prevTime - 1;
        } else {
          clearInterval(timerInterval);
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return <div className={classes.timer}>{timerOutput}</div>;
};

export default Timer;
