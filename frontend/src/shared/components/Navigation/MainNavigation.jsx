import { useState } from 'react';
import { Link } from 'react-router-dom';

import NavLinks from './NavLinks.jsx';
import MainHeader from './MainHeader.jsx';
import SideDrawer from './SideDrawer.jsx';
import './MainNavigation.css';
import Backdrop from '../UIElements/Backdrop.jsx';

export default function MainNavigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  function openDrawerHandler() {
    setDrawerIsOpen(true);
  }

  function closedDrawerHandler() {
    setDrawerIsOpen(false);
  }

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closedDrawerHandler} />}

      <SideDrawer show={drawerIsOpen} onClick={closedDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}
