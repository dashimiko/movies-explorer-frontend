import FilterCheckbox from '../filterCheckbox/FilterCheckbox';
import {useState} from 'react';
import { useForm } from "react-hook-form";

function SearchForm({handleSearchSubmit, handleShortFilms, shortMovies, movieSearch}) {

  const [searchInputValue,setSearchInputValue] = useState(movieSearch);

  const {
    register,
    formState : {
      errors,
    },
    handleSubmit,
  } = useForm({
    mode: "onSubmit"
  });

  function handleFormSubmit() {
    handleSearchSubmit(searchInputValue);
  }

  function handleSearchChange (event) {
    setSearchInputValue(event.target.value);
  }

  return (
    <section className="search section">
      <form className="search__form" noValidate name="search" onSubmit={handleSubmit(handleFormSubmit)}>
        <input {...register('searchForm', {
					required: 'Нужно ввести ключевое слово',
          minLength: {
            value: 1,
            message: 'Нужно ввести ключевое слово'
          },
					onChange: (e) => handleSearchChange(e),
				})}
        value={searchInputValue || ''}
        type="text" className="search__input" placeholder="Фильм"/>
        {errors?.searchForm && <span className="search__error error">{errors?.searchForm?.message || "Что-то пошло не так..."}</span>}
        <button className="search__button button">Найти</button>
      </form>
      <FilterCheckbox handleShortFilms={handleShortFilms} shortMovies={shortMovies}/>
      <div className="search__line line"></div>
    </section>
  );
}

export default SearchForm;
