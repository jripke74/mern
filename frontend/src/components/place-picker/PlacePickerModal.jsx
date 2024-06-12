import { useRef } from 'react';
import { createPortal } from 'react-dom';

import classes from './PlacePickerModal.module.css';

function Modal({ open, children }) {
  const dialog = useRef();

  dialog.current.showModal();

  return createPortal(
    <dialog className={classes.modal} ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
