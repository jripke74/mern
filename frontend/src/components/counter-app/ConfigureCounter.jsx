import { useState } from 'react';

import { log } from './log.js';
import classes from './ConfigureCounter.module.css';

export default function Configure({ onSet }) {
  log('<ConfigureCounter />', 1);

  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    onSet(enteredNumber);
    setEnteredNumber(0);
  }
  return (
    <section id={classes['configure-counter']}>
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  );
}
