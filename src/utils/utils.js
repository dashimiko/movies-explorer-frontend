import {SHORT_MOVIES_DURATION} from '../utils/constants'

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

 function filterSearchRequest(movies, inputValue){
  const key = inputValue.toLowerCase().trim();
  const searchMovieList = movies.filter(o => o.nameRU.toLowerCase().trim().indexOf(key) !== -1 || o.nameEN.toLowerCase().trim().indexOf(key) !== -1);
  return searchMovieList;
};

 function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration < SHORT_MOVIES_DURATION);
};

export {
  calculateDuration,
  filterShortMovies,
  filterSearchRequest
}
