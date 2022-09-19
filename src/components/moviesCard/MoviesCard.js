import { useLocation } from 'react-router-dom';

function MoviesCard ({movie}) {

  const location = useLocation();

  return (
    <article className="movie">
      <img className="movie__picture" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU}></img>
      <div className="movie__container">
        <div className='movie__box'>
          <h2 className="movie__title">{movie.nameRU}</h2>
          <span className="movie__duration">{`${Math.round(movie.duration/60)}ч ${movie.duration%60}м`}</span>
        </div>
        {location.pathname === '/saved-movies' ?
        (<button type="button" className='movie__button movie__delete'></button>)
        : (<button type="button" className='movie__button movie__like movie__like_active'></button>)}
      </div>
    </article>
  );
}

export default MoviesCard;
