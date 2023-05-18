const camelize = require('camelize');
const connection = require('./connection');

const insert = async (itemsSold) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  const allProducts = itemsSold.map(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [insertId, productId, quantity],
    );
  });
  await Promise.all(allProducts);

  return insertId;
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity
      FROM StoreManager.sales_products
      INNER JOIN StoreManager.sales
      ON StoreManager.sales_products.sale_id = StoreManager.sales.id
      ORDER BY sale_id ASC, product_id ASC;`,
  );
  return camelize(result);
};

const selectById = async (productId) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity
      FROM StoreManager.sales_products
      INNER JOIN StoreManager.sales
      ON StoreManager.sales_products.sale_id = sales.id
      WHERE sale_id = ?
      ORDER BY product_id ASC;`,
    [productId],
  );
  return camelize(result);
};

const deleteById = async (saleId) => {
  const [response] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [saleId],
  );
  return response;
};

module.exports = {
  insert,
  findAll,
  selectById,
  deleteById,
}; 