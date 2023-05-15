const saleCreated = {
  "id": 93,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 3
    },
    {
      "productId": 2,
      "quantity": 2
    }
  ]
};

const sale = [
  {
    productId: 1,
    quantity: 3,
  },
  {
    productId: 2,
    quantity: 2,
  },
];

const invalidQuantity = [
  {
    productId: 1,
    quantity: 0,
  },
];

module.exports = {
  saleCreated,
  invalidQuantity,
  sale,
};