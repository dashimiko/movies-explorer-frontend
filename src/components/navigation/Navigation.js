import { Link, useLocation } from 'react-router-dom';

function Navigation() {

  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? (
        <nav className="navigation__button-container">
          <ul className="navigation__button-list">
            <li className="navigation__button-item"><Link className="navigation__button-link link">Регистрация</Link></li>
            <li className="navigation__button-item"><Link className="navigation__button-link navigation__button-link_black button link">Войти</Link></li>
          </ul>
        </nav>
      ) : (
        <nav className="navigation__container">
          <ul className="navigation__list">
          <li className="navigation__item"><Link className="navigation__link navigation__link_main link">Главная</Link></li>
            <li className="navigation__item"><Link className="navigation__link link">Фильмы</Link></li>
            <li className="navigation__item"><Link className="navigation__link link">Сохранённые фильмы</Link></li>
            <li className="navigation__item navigation__item-profile"><Link className="navigation__link navigation__link_profile link">Аккаунт</Link></li>
          </ul>
        </nav>
      )}
   </>
  );
}

export default Navigation;
