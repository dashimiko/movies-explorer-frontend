import { useLocation } from 'react-router-dom';
import {calculateDuration} from '../../utils/utils';

function MoviesCard ({movie, liked, onMovieLike, onMovieDelete}) {

  const location = useLocation();

  function handleLikeClick() {
    onMovieLike(movie);
  };

  function handleDeleteClick () {
    onMovieDelete(movie);
  };

  const cardLikeButtonClassName = `movie__button movie__like ${liked ? "movie__like_active" : ''}`;

  return (

    <article className="movie">
      <a href={movie.trailerLink} target="_blank" className="movie__trailer-link" rel="noreferrer">
        <img className="movie__picture" src={movie.image} alt={movie.nameRU}></img>
      </a>
      <div className="movie__container">
        <div className='movie__box'>
          <h2 className="movie__title">{movie.nameRU}</h2>
          <span className="movie__duration">{calculateDuration(movie.duration)}</span>
        </div>
        {location.pathname === '/saved-movies' ?
        (<button type="button" className='movie__button movie__delete'
        onClick={handleDeleteClick}>
        </button>)
        : (<button type="button" className={cardLikeButtonClassName}
        onClick={liked ? handleDeleteClick : handleLikeClick}></button>)}
      </div>
    </article>
  );
}

export default MoviesCard;
