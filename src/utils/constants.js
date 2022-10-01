function calculateDuration(time) {
  if (Math.trunc(time/60) === 0) {
    return `${time}м`;
  } else {
    if (time%60 === 0) {
      return `${Math.trunc(time/60)}ч`;
    }
    return `${Math.trunc(time/60)}ч ${time%60}м`;
  }
};

//фильтрация фильмов по поиску
 function filterSearchRequest(inputValue, movies, shortMoviesCheckbox){
  const key = inputValue.toLowerCase().trim();//берем ключ из валью инпута
  //преобразуем свалку названий фильмов: нижний регистр, без пробелов + поиск по массиву через indexOf
  const searchMovieList = movies.filter(o => o.nameRU.toLowerCase().trim().indexOf(key) !== -1 || o.nameEN.toLowerCase().trim().indexOf(key) !== -1);
  if (shortMoviesCheckbox) {
    return filterShortMovies(searchMovieList);
  } else {
    return searchMovieList;
  }
};

 //фильтрация короткометражек
 function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration < 40);
};

export {
  calculateDuration,
  filterShortMovies,
  filterSearchRequest,
};
