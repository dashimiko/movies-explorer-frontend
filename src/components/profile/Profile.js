import { Link } from 'react-router-dom';

function Profile() {
  return (
    <section className="profile section">
      <h2 className="profile__title">Привет, Дарья!</h2>
      <form className="profile__form" novalidate>
        <div className="profile__form-box">
        <label className="profile__info">
          <input type="text" className="profile__input profile__input_name" value ="" placeholder="Имя" minlength="2" maxlength="30" required/>
          <span className="profile__value">Дарья</span>
          <span className="error profile__error" id=""></span>
        </label>
        <label className="profile__info">
          <input type="email" className = "profile__input profile__input_email" placeholder="E-mail" value ="" required/>
          <span className="profile__value">coder@js.com</span>
          <span className="link-error popup__error" id=""></span>
        </label>
        </div>
        <div className="profile__button-box">
          <button type="submit" class="profile__submit-button">Редактировать</button>
          <Link to="/" className='profile__link link'>Выйти из аккаунта</Link>
        </div>
      </form>
    </section>
  );
}

export default Profile;
