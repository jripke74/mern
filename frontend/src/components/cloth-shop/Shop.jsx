import classes from './Shop.module.css';

export default function Shop({ children }) {
  return (
    <section id={classes.shop}>
      <h2>Elegant Clothing For Everyone</h2>
      <ul id={classes.products}>{children}</ul>
    </section>
  );
}
