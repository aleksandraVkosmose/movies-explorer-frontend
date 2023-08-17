export const regForSymbols = /[_~!@#$%^&*()[\]+`'";:<>/\\|=]/g;
export const regForName = /[a-z-. а-яё]+/g;
export const regForPassword = /[0-9a-z-а-яё]+/g;

export const validationMessages = {
  name: "Имя содержит недопустимые символы. Текст может состоять из латиницы, кириллицы, дефиса, пробела",
  email: "Введите корректный формат почты",
  password:
    "Введите корректный формат пароля",
};

export const ITEMS_PER_PAGE = 12;

export const ADD_ITEMS = 3;
