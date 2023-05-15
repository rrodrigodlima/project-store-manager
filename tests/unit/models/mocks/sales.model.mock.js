const saleDB = [[
  {
    "sale_id": 1,
    "date": "2023-05-15T23:16:40.000Z",
    "product_id": 1,
    "quantity": 5
  },
  {
    "sale_id": 1,
    "date": "2023-05-15T23:16:40.000Z",
    "product_id": 2,
    "quantity": 10
  },
  {
    "sale_id": 2,
    "date": "2023-05-15T23:16:40.000Z",
    "product_id": 3,
    "quantity": 15
  }
]];

const saleResponse = [
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

const saleByIdDB = [[
  { date: '2023-05-15T23:16:40.000Z', product_id: 1, quantity: 5 },
  { date: '2023-05-15T23:16:40.000Z', product_id: 2, quantity: 10 }
]];

const saleByIdResponse = [
  { date: '2023-05-15T23:16:40.000Z', productId: 1, quantity: 5 },
  { date: '2023-05-15T23:16:40.000Z', productId: 2, quantity: 10 }
];

module.exports = {
  saleDB,
  saleResponse,
  saleByIdDB,
  saleByIdResponse,
};