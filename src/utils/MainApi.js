const validator = require('validator');

class MainApi {
  constructor(options) {
    this._options = options;
  }

  _checkResponse (res) {
    if (res.ok) {
      console.log(res)
      return res.json();
    }else {
      return res.json().then((data) => {
        throw new Error(data.message);
      });
    }
  };

  getSavedMovies() {
    return fetch(this._options.baseUrl + "/movies", {
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse).catch(console.log)
  }

  getProfile() {
    return fetch(this._options.baseUrl + "/users/me", {
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse)
  }

  editProfile(name,email) {
    return fetch(this._options.baseUrl + "/users/me",{
      method: "PATCH",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        email
      })
    }).then(this._checkResponse)
  }

  addSavedMovie(movieData) {
    return fetch(this._options.baseUrl + "/movies",{
      method: "POST",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: movieData.image,
        trailerLink: (validator.isURL(movieData.trailerLink) ? movieData.trailerLink : 'https://www.kinopoisk.ru/film/575256/video/type/0/'),
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
        thumbnail: movieData.thumbnail,
        movieId: movieData.id,
      })
    }).then(this._checkResponse).catch(console.log)
  }

  deleteSavedMovie(_id) {
    return fetch(this._options.baseUrl + "/movies/" + _id,{
      method: "DELETE",
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse).catch(console.log)
  }

  updateToken(token) {
    this._options.headers['Authorization'] = `Bearer ${token}`;
  }
}

const token = localStorage.getItem('jwt');

export const mainApi = new MainApi({
  baseUrl: `https://api.explorer.students.nomoredomains.sbs`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  credentials: 'include',
});
