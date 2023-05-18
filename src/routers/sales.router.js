const express = require('express');
const validateNewSaleFields = require('../middlewares/validateNewSaleFields');
const { salesController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  validateNewSaleFields, 
  salesController.createSale,
);

router.get(
  '/',
  salesController.listSales,
);

router.get(
  '/:id',
  salesController.getById,
);

router.delete(
  '/:id',
  salesController.removeSale,
);

router.put(
  '/:id',
  validateNewSaleFields,
  salesController.editSale,
);

module.exports = router;