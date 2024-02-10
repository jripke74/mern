import ReactDOM from 'react-dom';

import './SideDrawer.css';

export default function SideDrawer({ children }) {
  const content = <aside className="side-drawer">{children}</aside>;
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
}
