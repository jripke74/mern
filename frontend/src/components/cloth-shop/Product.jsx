import classes from './Product.module.css';

export default function Product({
  id,
  image,
  title,
  price,
  description,
  onAddToCart,
}) {
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
          <button onClick={() => onAddToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
