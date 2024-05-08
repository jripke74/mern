import classes from './TimerChallenge.module.css';

export default function TimerChalleng({ title, targetTime }) {
  return (
    <section className={classes.challenge}>
      <h2>{title}</h2>
      <p className={classes.challengeTime}>
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button>Start Challenge</button>
      </p>
      <p className="">Time is running... / Timer inactive</p>
    </section>
  );
}
