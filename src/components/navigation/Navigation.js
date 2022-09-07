import { Link, useLocation } from 'react-router-dom';

function Navigation({ isBurgerOpen, onBurgerClick }) {

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
        <>
          <nav className={`navigation navigation_state_${isBurgerOpen ? 'opened' : 'closed'}`} onClick={isBurgerOpen ? onBurgerClick : undefined}>
            <ul className={`navigation__list navigation__container navigation_${isBurgerOpen ? 'active' : ''}`}>
              <li className="navigation__item"><Link className="navigation__link navigation__link_main navigation__link_menu link">Главная</Link></li>
              <li className="navigation__item"><Link className="navigation__link navigation__link_menu link">Фильмы</Link></li>
              <li className="navigation__item"><Link className="navigation__link navigation__link_menu link">Сохранённые фильмы</Link></li>
              <li className="navigation__item navigation__item-profile"><Link className="navigation__link navigation__link_profile link">Аккаунт</Link></li>
            </ul>
          </nav>

          <div type="button" className={`hamburger-menu navigation_${isBurgerOpen ? 'active' : ''}`} onClick={onBurgerClick}>
            <span></span>
          </div>
        </>
      )}
   </>
  );
}

export default Navigation;
