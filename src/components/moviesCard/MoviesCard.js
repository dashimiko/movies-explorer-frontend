import { useLocation } from 'react-router-dom';

function MoviesCard ({movie}) {

  const location = useLocation();

  function calculateDuration(time) {
    if (Math.round(time/60) === 0) {
      return `${time}м`;
    } else {
      if (time%60 === 0) {
        return `${Math.round(time/60)}ч`;
      }
      return `${Math.round(time/60)}ч ${time%60}м`;
    }
  };

  return (
    <article className="movie">
      <img className="movie__picture" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU}></img>
      <div className="movie__container">
        <div className='movie__box'>
          <h2 className="movie__title">{movie.nameRU}</h2>
          <span className="movie__duration">{calculateDuration(movie.duration)}</span>
        </div>
        {location.pathname === '/saved-movies' ?
        (<button type="button" className='movie__button movie__delete'></button>)
        : (<button type="button" className='movie__button movie__like movie__like_active'></button>)}
      </div>
    </article>
  );
}

export default MoviesCard;
