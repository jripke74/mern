import { useState, useRef } from 'react';

import classes from './TimerChallenge.module.css';

// let timer;

export default function TimerChalleng({ title, targetTime }) {
  const timer = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
  }

  return (
    <section className={classes.challenge}>
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className={classes.challengeTime}>
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={classes.timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Time is running...' : 'Timer inactive'}
      </p>
    </section>
  );
}
