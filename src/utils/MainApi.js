//  const baseUrl = "https://api.moviesalexandera.nomoredomains.work";
 const baseUrl = "http://localhost:3000";

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`);
  }
  // Регистрация
  export const  register = (name, email, password) => {
    return fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ name, email, password }),
    }).then(checkResponse);
  };
  // Вход
  export const  authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ email, password }),
    }).then(checkResponse);
  };
  // Редактирование информации о пользователе
  export const  editUser = (name, email) => {
    return fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ name, email })
    }).then(checkResponse);
  }
  // Получение информации о пользователе с сервера
  export const getUser = () => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }
    return fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(checkResponse);
  }
  // Получение карточек с сервера
  export const  getSavedMovies = () => {
    return fetch(`${baseUrl}/movies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(checkResponse);
  }
  // Ставим лайк карточке
  export const saveMovie = (data) => {
    return fetch(`${baseUrl}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(data)
    }).then(checkResponse);
  }
  // Удаление карточки
  export const deleteMovie = (id) => {
    return fetch(`${baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(checkResponse);
  }

