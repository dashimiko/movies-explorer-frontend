import { Link } from 'react-router-dom';

function Profile() {
  return (
    <section className="profile section">
      <h2 className="profile__title">Привет, Дарья!</h2>
      <form className="profile__form" noValidate>
        <div className="profile__form-box">
        <label className="profile__info">
          <span className="profile__value profile__value_name">Дарья</span>
          <input type="text" className="profile__input profile__input_name" placeholder="Имя" minLength="2" maxLength="30" required/>
        </label>
        <label className="profile__info">
          <span className="profile__value">coder@js.com</span>
          <input type="email" className = "profile__input profile__input_email" placeholder="E-mail" minLength="2" maxLength="30" required/>
          <span className="password-error register__error error">Что-то пошло не так...</span>
        </label>
        </div>
        <div className="profile__button-box">
          <button type="submit" className="button profile__submit-button">Редактировать</button>
          <Link to="/" className='profile__link link'>Выйти из аккаунта</Link>
        </div>
      </form>
    </section>
  );
}

export default Profile;
