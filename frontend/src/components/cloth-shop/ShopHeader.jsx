import { useRef, useContext } from 'react';

import CartModal from './CartModal.jsx';
import { CartContext } from '../../store/shopping-cart-context.jsx';
import classes from './ShopHeader.module.css';
import logo from '../../assets/logo2.png';

export default function Header() {
  const modal = useRef();
  const { items } = useContext(CartContext);

  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id={classes['main-header']}>
        <div id={classes['main-title']}>
          <img src={logo} alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
