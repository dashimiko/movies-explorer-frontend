import { Link } from 'react-router-dom';
import logo from '../../images/logo__icon.svg';

function Form({greeting,name,children,onSubmit}) {

  return (
    <section className="entry section">
      <div className="entry__box">
        <Link to='/' className='entry_logo-link button'>
          <img src={logo} alt="Лого проекта" />
        </Link>
        <h2 className="entry__title">{greeting}</h2>
        <form className={`entry__form entry-form__${name}`} name={name} onSubmit={onSubmit} noValidate>
         {children}
        </form>
      </div>
    </section>
  );
}

export default Form;
