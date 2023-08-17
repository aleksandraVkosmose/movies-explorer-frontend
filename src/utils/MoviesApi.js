class MoviesApi {
    constructor(options) {
      this._options = options;
      this._baseUrl = this._options.baseUrl;
    }
    _checkResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`);
    }
    getMovies() {
      return fetch(`${this._baseUrl}/beatfilm-movies`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(this._checkResponse);
    }
  }
  
  const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co",
  });
  
  export default moviesApi;