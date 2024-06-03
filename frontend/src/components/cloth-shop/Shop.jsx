import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './Product.jsx';

export default function Shop({ onAddItemToCart }) {
  return (
    <section id="shop">
      <h3>Elegant Clothing For Everyone</h3>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddItemToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
