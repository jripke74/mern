import { log } from './log.js';
import logoImg from './assets/logo.png';
import classes from './CounterHeader.module.css';

export default function Header() {
  log('<Header /> rendered', 1);

  return (
    <header id={classes['main-header']}>
      <img src={logoImg} alt="Magnifying glass analyzing a document" />
      <h1>React - Behind The Scenes</h1>
    </header>
  );
}
