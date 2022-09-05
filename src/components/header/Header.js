import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo__icon.svg';
import Navigation from '../navigation/Navigation'

function Header() {

  const location = useLocation();

  return (
    <div className={`header header__section_${location.pathname === '/' ? 'pink' : 'white'}`}>
      <div className="header__section section">
      <Link to='/' className='header__link'>
        <img src={logo} alt="Лого проекта" />
      </Link>
      <Navigation/>
      </div>
    </div>
  );
}

export default Header;
