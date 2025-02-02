const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addSaleSchema = Joi.array().items({
  productId: Joi.number().integer().min(1).required(), 
  quantity: Joi.number().integer().min(1).required(),
});

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  idSchema,
  addProductSchema,
  addSaleSchema,
};