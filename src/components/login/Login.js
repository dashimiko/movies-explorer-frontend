import { Link } from 'react-router-dom';
import Form from "../form/Form";

function Register() {
  return (
    <Form greeting={'Рады видеть!'} name={'login'}>
      <label className="entry__label register__label">
        <span className="entry__text">E-mail</span>
        <input name="email" className="entry__input entry__input_email register__input register__input_email"/>
        <span className="email-error register__error error">Что-то пошло не так...</span>
      </label>
      <label className="entry__label register__label">
        <span className="entry__text">Пароль</span>
        <input type="password" name="password" className="entry__input entry__input_password register__input register__input_password"/>
        <span className="password-error register__error error">Что-то пошло не так...</span>
      </label>
      <div className="entry__button-box login__button-box">
        <button type="submit" className="button entry__submit-button">Зарегистрироваться</button>
        <div className="entry__link-box">
          <span className='entry__proposition'>Еще не зарегистрированы?</span>
          <Link to="/signup" className='entry__link link'>Регистрация</Link>
        </div>
      </div>
    </Form>
  );
}

export default Register;
