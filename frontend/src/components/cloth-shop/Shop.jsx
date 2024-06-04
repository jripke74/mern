import classes from './Shop.module.css';

export default function Shop({ children }) {
  return (
    <section>
      <ul id={classes.products}>{children}</ul>
    </section>
  );
}
