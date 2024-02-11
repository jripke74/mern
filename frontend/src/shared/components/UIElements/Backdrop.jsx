import ReactDOM from 'react-dom';

import './Backdrop.css';

export default function Backdrop({ onClick }) {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById('backdrop-hook')
  );
}
