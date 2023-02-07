const OK = 200; // Запрос пользователя успешно выполнен

const CreatedCode = 201; // Успешно, ресурс создан

const BadRequest = 400; // Некорректный запрос

const Unauthorized = 401; // Используйте действительную почту и пароль

const Forbidden = 403; // Сервер понял запрос, но отказывается его авторизовать

const NotFound = 404; // Не найдено

const Conflict = 409; // Пользователь с таким email уже существует

const InternalServerError = 500; // Внутренняя ошибка сервера

module.exports = {
  OK,
  CreatedCode,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  InternalServerError,
};
