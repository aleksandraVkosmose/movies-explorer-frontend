class MainApi {
    constructor(options) {
      this._options = options;
      this._baseUrl = this._options.baseUrl;
      this._headers = this._options.headers;
    }
  
    _checkResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`);
    }

    register = (name, email, password) => {
        return fetch(`${this._baseUrl}/signup`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({ name, email, password }),
        }).then(this._checkResponse);
      };

    authorize = (email, password) => {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    };

    editUser = (name, email) => {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name, email })
      }).then(this._checkResponse);
    }

    getUser = (jwt) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
              ...this._headers,
              Authorization: `Bearer ${jwt}`,
            },
          }).then(this._checkResponse);
    }
  
    getMovies() {
      return fetch(`${this._baseUrl}/movies`, {
        method: "GET",
        headers: this._headers,
      }).then(this._checkResponse);
    }

    likeMovie({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId }) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId
            })
          }).then(this._checkResponse);
    }

    unLikeMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            headers: this._headers,
          }).then(this._checkResponse);
    }
  }
  
  const mainApi = new MainApi({
    // baseUrl: "https://api.moviesalexandera.nomoredomains.work",
    baseUrl: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  });
  
  export default mainApi;

