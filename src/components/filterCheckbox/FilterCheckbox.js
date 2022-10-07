function FilterCheckbox({handleShortFilms, shortMovies, isDisabled}) {
  return (
    <label className="checkbox">
      <input checked={shortMovies ? true : false} onChange={() => handleShortFilms()} /*disabled={isDisabled}*/
        className="checkbox__invisible-input" type="checkbox" name="checkbox"/>
      <span className="checkbox__visible-input button"></span>
      <p className="checkbox__title">Короткометражки</p>
    </label>
  );
}

export default FilterCheckbox;
