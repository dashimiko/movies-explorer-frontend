function FilterCheckbox({handleShortFilms, shortMovies, isDisabled}) {
  return (
    <label className="checkbox">
      <input onChange={handleShortFilms} disabled={isDisabled} checked={shortMovies ? true : false}
        className="checkbox__invisible-input" type="checkbox" name="checkbox"/>
      <span className="checkbox__visible-input button"></span>
      <p className="checkbox__title">Короткометражки</p>
    </label>
  );
}

export default FilterCheckbox;
