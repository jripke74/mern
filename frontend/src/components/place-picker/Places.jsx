import classes from './Places.module.css';

export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
  isLoading,
  loadingText,
}) {
  return (
    <section className={classes['places-category']}>
      <h2>{title}</h2>
      {isLoading && <p className={classes['fallback-text']}>{loadingText}</p>}
      {!isLoading && places.length === 0 && (
        <p className={classes['fallback-text']}>{fallbackText}</p>
      )}
      {!isLoading && places.length > 0 && (
        <ul className={classes.places}>
          {places.map((place) => (
            <li key={place.id} className={classes['place-item']}>
              <button onClick={() => onSelectPlace(place.id)}>
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
