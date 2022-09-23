import FilterCheckbox from '../filterCheckbox/FilterCheckbox';
import {useState} from 'react';
import { useForm } from "react-hook-form";

function SearchForm({handleSearchSubmit}) {

  const [inputValue,setInputValue] = useState('');


  const handleSubmit = (e) =>{
    e.preventDefault();
    handleSearchSubmit(inputValue);
  }

  const handleInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  return (
    <section className="search section">
      <form className="search__form" noValidate name="search" onSubmit={handleSubmit}>
        <input onChange={handleInput} value={inputValue} className="search__input" type="text" name="search__input" placeholder="Фильм" required/>
        <span className="search__error error"></span>
        <button className="search__button button">Найти</button>
      </form>
      <FilterCheckbox/>
      <div className="search__line line"></div>
    </section>
  );
}

export default SearchForm;
