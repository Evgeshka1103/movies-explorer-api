const handleError = (err, req, res, next) => {
  const { InternalServerError = 500, message } = err;
  console.log(message);
  res.status(InternalServerError).send({
    message:
      InternalServerError === 500 ? 'Внутренняя ошибка сервера' : message,
  });
  next();
};

module.exports = { handleError };
