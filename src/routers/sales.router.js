const express = require('express');
const validateNewSaleFields = require('../middlewares/validateNewSaleFields');
const { salesController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  validateNewSaleFields, 
  salesController.createSale,
);

module.exports = router;