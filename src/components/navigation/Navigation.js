import { Link, useLocation } from 'react-router-dom';

function Navigation({ isBurgerOpen, onBurgerClick }) {

  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? (
        <>
        <nav className="navigation__button-container">
          <ul className="navigation__button-list">
            <li className="navigation__button-item"><Link to='/' className="navigation__button-link link">Регистрация</Link></li>
            <li className="navigation__button-item"><Link to='/' className="navigation__button-link navigation__button-link_black button link">Войти</Link></li>
          </ul>
        </nav>
        </>
      ) : (
        <>
          <nav className={`navigation navigation_state_${isBurgerOpen ? 'opened' : 'closed'}`} onClick={isBurgerOpen ? onBurgerClick : undefined}>
            <ul className={`navigation__list navigation__container navigation_${isBurgerOpen ? 'active' : ''}`}>
              <li className="navigation__item"><Link to='/' className="navigation__link navigation__link_main navigation__link_menu link">Главная</Link></li>
              <li className="navigation__item"><Link to='/movies' className="navigation__link navigation__link_active navigation__link_menu-ative link">Фильмы</Link></li>
              <li className="navigation__item"><Link to='/saved-movies' className="navigation__link navigation__link_menu link">Сохранённые фильмы</Link></li>
              <li className="navigation__item navigation__item-profile"><Link to='/profile' className="navigation__link navigation__link_profile link">Аккаунт</Link></li>
            </ul>
          </nav>

          <div type="button" className={`hamburger-menu ${isBurgerOpen ? 'hamburger-menu_fixed navigation_active' : ''}`} onClick={onBurgerClick}>
            <span></span>
          </div>
        </>
      )}
    </>
  );
}

export default Navigation;
