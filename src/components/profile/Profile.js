import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Profile() {

  const {
    register,
    formState : {
      errors, isValid
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  }/*submit imitation*/

  return (
  <main>
    <section className="profile section">
      <h2 className="profile__title">Привет, Дарья!</h2>
      <form className="profile__form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="profile__form-box">
        <label className="profile__info">
        {errors?.userName && <span className="name-error profile__error error">{errors?.userName?.message || "Что-то пошло не так..."}</span>}
          <span className="profile__value profile__value_name">Имя</span>
          <input {...register("userName",
          {required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: 'Должно быть минимум два символа'
          },
          maxLength: {
            value: 30,
            message: 'Должно быть максимум 30 символов'
          }
          })}
        type="text" className="profile__input profile__input_name" placeholder="Дарья"/>
        </label>
        <label className="profile__info">
          <span className="profile__value">E-mail</span>
          <input {...register("userEmail",
          {required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: 'Должно быть минимум два символа'
          },
          maxLength: {
            value: 50,
            message: 'Должно быть максимум 50 символов'
          },
          pattern: {
            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: 'Введите адрес электронной почты'
          }
        })}
        type="email" className = "profile__input profile__input_email" placeholder="coder@js.com" minLength="2" maxLength="30" required/>
          {errors?.userEmail && <span className="email-error profile__error error">{errors?.userEmail?.message || "Что-то пошло не так..."}</span>}
        </label>
        </div>
        <div className="profile__button-box">
          <button type="submit" disabled={!isValid} className='button profile__submit-button'>Редактировать</button>
          <Link to="/" className='profile__link link'>Выйти из аккаунта</Link>
        </div>
      </form>
    </section>
  </main>
  );
}

export default Profile;
