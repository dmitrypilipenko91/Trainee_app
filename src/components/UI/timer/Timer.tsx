import classes from './Timer.module.css';
import { useDeferredValue, useEffect, useState } from 'react';

function formatTime(seconds: number) {
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

let timerInterval: number;

interface TimerProps {
  onFinish: () => void;
}

const Timer: React.FC<TimerProps> = ({ onFinish }) => {
  const [timerTime, setTimerTime] = useState(60);
  const deferredTimerTime = useDeferredValue(timerTime);
  const timerOutput: string = formatTime(deferredTimerTime);

  const startTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      setTimerTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerInterval);
          onFinish();
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
