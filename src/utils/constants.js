export const regForSymbols  = /[_~!@#$%^&*()[\]+`'";:<>/\\|=]/g;
export const regForName     = /[a-z-. а-яё]+/g;
export const regForPassword = /[0-9a-z-а-яё]+/g;

export const validationMessages = {
  name    : "Имя содержит недопустимые символы. Текст может состоять из латиницы, кириллицы, дефиса, пробела.",
  email   : "Введите корректный формат почты",
  password: 
    "Пароль содержит не допустимые символы. Текст может состоять из цифр, латиницы, кириллицы, дефиса.",
}