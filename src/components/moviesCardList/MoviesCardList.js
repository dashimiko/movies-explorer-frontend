import MoviesCard from '../moviesCard/MoviesCard'

function MoviesCardList({movies}) {
  return (
    <div className="movies section">
       <ul className="movies__list">
       {movies.map((movie) => {
        return (
          <MoviesCard key={movie._id} movie={movie}/>
          );
        })}
       </ul>
       <div className="movies__pagination-box">
         <button className="button movies__pagination">Ещё</button>
       </div>
    </div>
  );
}

export default MoviesCardList;
