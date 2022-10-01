import { useLocation } from 'react-router-dom';
import {calculateDuration} from '../../utils/constants';

function MoviesCard ({movie}) {

  const location = useLocation();

  return (

    <article className="movie">
      <a href={movie.trailerLink} target="_blank" className="movie__trailer-link" rel="noreferrer">
        <img className="movie__picture" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU}></img>
      </a>
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
