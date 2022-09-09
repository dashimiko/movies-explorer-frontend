import FilterCheckbox from '../filterCheckbox/FilterCheckbox'

function SearchForm() {

  return (
    <section className="search section">
      <form noValidate className="search__form" name="search__form">
        <input className="search__input" type="text" name="search__input" placeholder="Фильм" required/>
        <span className="search__error"></span>
        <button className="search__button button">Найти</button>
      </form>
      <FilterCheckbox/>
      <div className="search__line line"></div>
    </section>
  );
}

export default SearchForm;
