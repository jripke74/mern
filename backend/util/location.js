// import { default as AppleMaps } from 'apple-maps-server-sdk';
import AppleMaps from 'apple-maps-server-sdk';
import HttpError from '../models/http-error.js';

const Apple = AppleMaps.default;

const appleMaps = new Apple({
  authorizationToken: process.env.MAP_KIT,
});

async function getCoordsForAddress(address) {
  await appleMaps
    .geocode({
      q: address,
    })
    .then((response) => {
      coordinates = {
        lat: response.results[0].coordinate.latitude,
        lng: response.results[0].coordinate.longitude,
      };
    })
    .catch((err) => {
      const error = new HttpError(
        'Could not find location for the specified address.',
        422
      );
      throw error;
    });

  return coordinates;
}

export default getCoordsForAddress;
