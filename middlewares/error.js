const handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Внутренняя ошибка сервера' : message,
  });
  next();
};

module.exports = { handleError };
