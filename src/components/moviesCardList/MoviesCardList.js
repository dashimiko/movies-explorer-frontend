/*import MoviesCard from '../moviesCard/MoviesCard';

function MoviesCardList({ movies, moreMovies}) {

  if (movies.length === 0) return (
    <div className="movies section">
      <p className="movies__notfound">Ничего не найдено</p>
    </div>
  )
  return (
    <div className="movies section">
    <ul className="movies__list">
     {movies.length > 0 && movies.map((movie) => {
      return (
        <MoviesCard key={movie.id} movie={movie}/>
        );
      })}
    </ul>
    {moreMovies? (
    <div className="movies__pagination-box">
      <button className="button movies__pagination">Ещё</button>
    </div>): ""}
  </div>
  );
}

export default MoviesCardList;*/


import MoviesCard from '../moviesCard/MoviesCard';

function MoviesCardList({ movies, moreMovies, notFound}) {

  if (!notFound) return (
    <div className="movies section">
      <p className="movies__notfound">Ничего не найдено</p>
    </div>
  )
  return (
    <div className="movies section">
    <ul className="movies__list">
     {movies.length > 0 && movies.map((movie) => {
      return (
        <MoviesCard key={movie.id} movie={movie}/>
        );
      })}
    </ul>
    {moreMovies? (
    <div className="movies__pagination-box">
      <button className="button movies__pagination">Ещё</button>
    </div>): ""}
  </div>
  );
}

export default MoviesCardList;
