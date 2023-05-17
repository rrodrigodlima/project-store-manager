module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ type: 'FIELD_NOT_FOUND', message: '"name" is required' });
  }

  return next();
};
