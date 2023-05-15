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

const saleSuccessful = [
  {
    "saleId": 1,
    "date": "2023-05-15T23:16:40.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-05-15T23:16:40.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-05-15T23:16:40.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const saleByIdSuccessful = [
  {
    "date": "2023-05-15T23:16:40.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-05-15T23:16:40.000Z",
    "productId": 2,
    "quantity": 10
  }
];

module.exports = {
  saleCreated,
  invalidQuantity,
  sale,
  saleSuccessful,
  saleByIdSuccessful,
};