import { useContext } from 'react';

import { CartContext } from '../../store/shopping-cart-context.jsx';
import classes from './Cart.module.css';

export default function Cart() {
  const { items, updateItemQuantity } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, items) => acc + items.price * items.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id={classes.cart}>
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id={classes['cart-items']}>
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span>({formattedPrice})</span>
                </div>
                <div className={classes['cart-item-actions']}>
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id={classes['cart-total-price']}>
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
