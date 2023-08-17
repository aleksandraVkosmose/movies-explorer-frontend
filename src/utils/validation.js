import {
  validationMessages,
} from "./constants";

export const isEmail = (email) => {
  return !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email) || !email ? validationMessages.email : "";
};

export const isName = (name) => {
  return !(/^[a-zA-Zа-яА-Я\- ]{2,}$/).test(name) || !name ? validationMessages.name : "";
};

export const isPassword = (password) => {
  return !(/^[A-Za-z0-9#?!@$ %^&*-]{3,30}$/).test((password)) || !password ? validationMessages.password : "";
};