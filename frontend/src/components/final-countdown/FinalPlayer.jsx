import classes from './FinalPlayer.module.css';

export default function FinalPlayer() {
  return (
    <section className={classes.player}>
      <h2>Welcome unknown entity</h2>
      <p>
        <input type="text" />
        <button>Set Name</button>
      </p>
    </section>
  );
}
