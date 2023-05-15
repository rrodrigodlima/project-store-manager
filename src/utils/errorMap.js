const errorMap = {
  REQUEST_NOT_FOUND: 404,
  FIELD_NOT_FOUND: 400,
  INVALID_VALUE: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};