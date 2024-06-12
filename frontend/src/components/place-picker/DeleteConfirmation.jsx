import { useEffect, useState } from 'react';

import classes from './DeleteCofirmation.module.css';
import ProgressBar from './ProgressBar';

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id={classes['delete-confirmation']}>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id={classes['confirmation-actions']}>
        <button onClick={onCancel} className={classes['button-text']}>
          No
        </button>
        <button onClick={onConfirm} className={classes.button}>
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
