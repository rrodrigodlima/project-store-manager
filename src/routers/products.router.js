// src/routers/passenger.router.js

const express = require('express');
const { productsController } = require('../controllers');

// const validateNewPassengerFields = require('../middlewares/validateNewPassengerFields');
// const validateRequestTravelSchema = require('../middlewares/validateRequestTravelSchema');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.getProduct,
);

// router.post(
//   '/',
//   validateNewPassengerFields,
//   passengerController.createPassenger,
// );

// router.post(
//   '/:passengerId/request/travel',
//   validateRequestTravelSchema,
//   passengerController.createTravel,
// );

module.exports = router;