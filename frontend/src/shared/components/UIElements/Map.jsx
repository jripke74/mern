import './Map.css';

export default function Map({ center, className, style }) {
  const lat = center.lat;
  const lng = center.lng;

  return (
    <div className={`map ${className}`} style={style}>
      <p>{lat}</p>
      <p>{lng}</p>
    </div>
  );
}
