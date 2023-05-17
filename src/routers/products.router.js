// src/routers/passenger.router.js

const express = require('express');
const { productsController } = require('../controllers');
const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.getProduct,
);

router.post(
  '/',
  validateNewProductFields,
  productsController.registerProduct,
);

router.put(
  '/:id',
  validateNewProductFields,
  productsController.editProduct,
);

router.delete(
  '/:id',
  productsController.removeProduct,
);

// router.post(
//   '/:passengerId/request/travel',
//   validateRequestTravelSchema,
//   passengerController.createTravel,
// );

module.exports = router;