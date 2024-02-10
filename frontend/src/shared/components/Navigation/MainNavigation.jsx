import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import './MainNavigation.css';

export default function MainNavigation() {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">YourPlaces</Link>
      </h1>
      <nav>...</nav>
    </MainHeader>
  );
}
