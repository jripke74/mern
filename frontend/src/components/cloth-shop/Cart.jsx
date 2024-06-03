import classes from './Cart.module.css';

export default function Cart({ items, onUpdateItemQuantity }) {
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
          {items.map((items) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span>({formattedPrice})</span>
                </div>
                <div className={cartIemsActions}>
                  <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
