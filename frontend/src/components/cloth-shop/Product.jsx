import { useContext } from 'react';

import classes from './Product.module.css';

import { CartContext } from '../../store/shopping-cart-context.jsx';

export default function Product({ id, image, title, price, description }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <article className={classes.product}>
      <img src={image} alt={title} />
      <div className={classes['product-content']}>
        <div>
          <h3>{title}</h3>
          <p className={classes.productPrice}>${price}</p>
          <p>{description}</p>
        </div>
        <p className={classes['product-actions']}>
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
