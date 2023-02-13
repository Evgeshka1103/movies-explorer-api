const handleError = (err, req, res, next) => {
  const { status = 500, message } = err;
  console.log(message);
  res.status(status).send({
    message: status === 500 ? 'Внутренняя ошибка сервера' : message,
  });
  next();
};

module.exports = { handleError };
