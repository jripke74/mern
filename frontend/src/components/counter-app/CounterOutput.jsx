import { log } from './log.js';
import classes from './CounterOutput.module.css';

export default function CounterOutput({ value }) {
  log('<CounterOutput /> rendered', 2);

  const cssClass =
    value >= 0 ? classes['counter-output'] : classes['counter-output'];
  return <span className={cssClass}>{value}</span>;
}
