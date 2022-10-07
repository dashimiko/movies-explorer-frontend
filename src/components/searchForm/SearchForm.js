import FilterCheckbox from '../filterCheckbox/FilterCheckbox';
import {useState,useContext, useEffect} from 'react';
import { useForm } from "react-hook-form";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { useLocation } from 'react-router-dom';

function SearchForm({handleSearchSubmit, handleShortFilms, shortMovies, isDisabled}) {

  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const [searchInputValue,setSearchInputValue] = useState('');

  const {
    register,
    formState : {
      errors,
    },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
  });

  function handleFormSubmit() {
    handleSearchSubmit(searchInputValue);
  }

  function handleSearchChange (event) {
    setSearchInputValue(event.target.value);
  }


  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(`${currentUser._id} movieSearch`)) {
      const searchValue = localStorage.getItem(`${currentUser._id} movieSearch`);
      setSearchInputValue(searchValue);
    }
  }, [currentUser]);

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
      <FilterCheckbox isDisabled={!searchInputValue && location.pathname === '/movies' ? true : false} handleShortFilms={handleShortFilms} shortMovies={shortMovies}/>
      <div className="search__line line"></div>
    </section>
  );
}

export default SearchForm;
