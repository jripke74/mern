import { useState } from 'react';

import Card from '../../shared/components/UIElements/Card.jsx';
import Button from '../../shared/components/FormElements/Button.jsx';
import './PlaceItem.css';
import Modal from '../../shared/components/UIElements/Modal.jsx';
import Map from '../../shared/components/UIElements/Map.jsx';

export default function PlaceItem({
  image,
  title,
  address,
  description,
  id,
  coordinates,
}) {
  const [showMap, setShowMap] = useState(false);

  function openMapHandler() {
    setShowMap(true);
  }

  function closeMapHandler() {
    setShowMap(false);
  }

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
}
