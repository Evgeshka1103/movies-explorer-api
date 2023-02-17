const OK = 200; // Запрос пользователя успешно выполнен

const CreatedCode = 201; // Успешно, ресурс создан

const BadRequest = 400;
const badRequestErrorMessage = 'Некорректный запрос';

const Unauthorized = 401;
const unauthorizedErrorMessage = 'Используйте действительную почту и пароль';

const Forbidden = 403;
const forbiddenErrorMessage = 'Сервер понял запрос, но отказывается его авторизовать';

const NotFound = 404;
const notFoundErrorMessage = 'Не найдено';

const Conflict = 409;
const conflictErrorMessage = 'Пользователь с таким email уже существует';

const InternalServerError = 500;
const internalServerErrorMessage = 'Ошибка сервера';

module.exports = {
  OK,
  CreatedCode,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  InternalServerError,
  badRequestErrorMessage,
  unauthorizedErrorMessage,
  forbiddenErrorMessage,
  notFoundErrorMessage,
  conflictErrorMessage,
  internalServerErrorMessage,
};
