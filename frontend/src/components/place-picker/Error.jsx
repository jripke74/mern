import classes from './Error.module.css';

export default function Error({ title, message, onConfirm }) {
  return (
    <div className={classes.error}>
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id={classes['confirmation-actions']}>
          <button onClick={onConfirm} className={classes.button}>
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
