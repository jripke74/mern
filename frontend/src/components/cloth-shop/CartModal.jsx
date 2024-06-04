import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Cart from './Cart.jsx';
import classes from './Cart.module.css';

const CartModal = forwardRef(function Modal(
  { cartItems, onUpdateCartIemQuantity, title, actions },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id={classes.modal} ref={dialog}>
      <h2>{title}</h2>
      <Cart
        items={cartItems}
        onUpdateCartIemQuantity={onUpdateCartIemQuantity}
      />
      <form method="dialog" id={classes['modal-actions']}>
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
