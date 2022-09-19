class MoviesApi {

  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log('res ok')
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._options.baseUrl + '/beatfilm-movies', {
      headers: this._options.headers,
    })
    .then(this._checkResponse)
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

