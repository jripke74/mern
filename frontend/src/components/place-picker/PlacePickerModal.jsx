import { useRef } from 'react';
import { createPortal } from 'react-dom';

import classes from './PlacePickerModal.module.css';

function Modal({ open, children }) {
  const dialog = useRef();

  return createPortal(
    <dialog className={classes.modal} ref={dialog} open={open}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
