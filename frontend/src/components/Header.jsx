import logo from '../assets/investment-calculator-logo.png'; // cmt

export default function Header() {
  return (
    <header id="header">
      <img src={logo} alt="Logo showing money bag" />
      <h1>Investment Calculator</h1>
    </header>
  );
}
