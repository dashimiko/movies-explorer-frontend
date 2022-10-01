class MainApi {
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

  getSavedMovies() {
    return fetch(this._options.baseUrl + "/movies", {
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse).catch(console.log)
  }//получить все сохраненные фильмы

  getProfile() {
    return fetch(this._options.baseUrl + "/users/me", {
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse).catch(console.log)
  }//получить данные текущего пользователя

  editProfile(name,email) {
    return fetch(this._options.baseUrl + "/users/me",{
      method: "PATCH",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        email
      })
    }).then(this._checkResponse).catch(console.log)
  }//отредактировать данные пользователя

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
        trailerLink:movieData.trailerLink,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
        thumbnail: movieData.thumbnail,
        movieId: movieData.movieId,
      })
    }).then(this._checkResponse).catch(console.log)
  }//добавление нового фильма в сохраненное

  deleteSavedMovie(_id) {
    return fetch(this._options.baseUrl + "/movies/" + _id,{
      method: "DELETE",
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse).catch(console.log)
  }//удаление фильма из сохраненного

  updateToken(token) {
    this._options.headers['Authorization'] = `Bearer ${token}`;
  }
}

const token = localStorage.getItem('jwt');

export const mainApi = new MainApi({
  //baseUrl: `${window.location.protocol}${'https://api.explorer.students.nomoredomains.sbs' || '//localhost:3001'}`,
  baseUrl: `https://api.explorer.students.nomoredomains.sbs`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  credentials: 'include',
});
