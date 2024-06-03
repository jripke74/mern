import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './Product.jsx';
import classes from './Shop.module.css';

export default function Shop({ onAddItemToCart }) {
  return (
    <section>
      <ul id={classes.products}>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddItemToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
