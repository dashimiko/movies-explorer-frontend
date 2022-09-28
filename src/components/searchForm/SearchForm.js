import FilterCheckbox from '../filterCheckbox/FilterCheckbox';
import {useState} from 'react';

function SearchForm({handleSearchSubmit, handleShortFilms, shortMovies}) {

  const [inputValue,setInputValue] = useState('');


  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(inputValue);
  }

  function handleInput (e) {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  return (
    <section className="search section">
      <form className="search__form" noValidate name="search" onSubmit={handleFormSubmit}>
        <input onChange={handleInput} value={inputValue || ''} className="search__input" type="text" name="search__input" placeholder="Фильм" required/>
        <span className="search__error error"></span>
        <button className="search__button button">Найти</button>
      </form>
      <FilterCheckbox handleShortFilms={handleShortFilms} />
      <div className="search__line line"></div>
    </section>
  );
}

export default SearchForm;
