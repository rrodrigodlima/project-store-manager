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

module.exports = { insert }; 