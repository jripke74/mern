const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: '20 W 34th St, New Your, NY 10001',
    createrId: 'u1',
  },
];

router.get('/:pId', (req, res, next) => {
  const placeId = req.params.pId;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  res.json({ place });
});

module.exports = router;
