import MoviesCard from '../moviesCard/MoviesCard';

function MoviesCardList({movies, moreMovies}) {
  return (
    <div className="movies section">
      {/*<p className="movies__notfound">Ничего не найдено</p>*/}
      <ul className="movies__list">
       {movies.map((movie) => {
        return (
          <MoviesCard key={movie._id} movie={movie}/>
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
