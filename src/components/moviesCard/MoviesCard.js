/*import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard ({movie}) {

  const [isShownDeleteButton, setIsShownDeleteButton] = useState(false);
  const location = useLocation();

  return (
    <article className="movie"
        onMouseEnter={() => setIsShownDeleteButton(true)}
        onMouseLeave={() => setIsShownDeleteButton(false)}>
      <img className="movie__picture" src={movie.picture} alt=""></img>
      <div className="movie__container">
        <div className='movie__box'>
          <h2 className="movie__title">{movie.title}</h2>
          <span className="movie__duration">{movie.duration}</span>
        </div>
        {location.pathname === '/saved-movies' ?
        isShownDeleteButton && (<button type="button" className='movie__button movie__delete'></button>)
        : (<button type="button" className='movie__button movie__like movie__like_active'></button>)}
      </div>
    </article>
  );
}

export default MoviesCard;*/

import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard ({movie}) {

  const [isShownDeleteButton, setIsShownDeleteButton] = useState(false);
  const location = useLocation();

  let width = window.innerWidth;

  if (width >= 568 && location.pathname === '/saved-movies') {
    return (
      <article className="movie"
        onMouseEnter={() => setIsShownDeleteButton(true)}
        onMouseLeave={() => setIsShownDeleteButton(false)}>
      <img className="movie__picture" src={movie.picture} alt=""></img>
      <div className="movie__container">
        <div className='movie__box'>
          <h2 className="movie__title">{movie.title}</h2>
          <span className="movie__duration">{movie.duration}</span>
        </div>
        {isShownDeleteButton && (<button type="button" className='movie__button movie__delete'></button>)}
      </div>
    </article>
    )
  } else if (width < 568 && location.pathname === '/saved-movies') {
    return (
      <article className="movie">
      <img className="movie__picture" src={movie.picture} alt=""></img>
      <div className="movie__container">
        <div className='movie__box'>
          <h2 className="movie__title">{movie.title}</h2>
          <span className="movie__duration">{movie.duration}</span>
        </div>
        <button type="button" className='movie__button movie__delete'></button>
      </div>
    </article>
    )
  } else {
    return (
      <article className="movie">
      <img className="movie__picture" src={movie.picture} alt=""></img>
      <div className="movie__container">
        <div className='movie__box'>
          <h2 className="movie__title">{movie.title}</h2>
          <span className="movie__duration">{movie.duration}</span>
        </div>
        <button type="button" className='movie__button movie__like movie__like_active'></button>
      </div>
    </article>
    )
  }
}

export default MoviesCard;
