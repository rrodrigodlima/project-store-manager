const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(product);
};

const selectById = async (productId) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [productId]);
  return result;
};

const insert = async (product) => {
  const columns = Object.keys(snakeize(product)).join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

const updateProductById = async (productId, update) => {
  const placeholders = Object.keys(snakeize(update))
    .map((key) => `${key} = ?`)
    .join(', ');

  const result = await connection.execute(
    `UPDATE StoreManager.products SET ${placeholders} WHERE id = ?`,
    [...Object.values(update), productId],
  );

  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  selectById,
  updateProductById,
};