import { Link } from 'react-router-dom';
import Form from "../form/Form";
import { useForm } from "react-hook-form";

function Register() {

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
  }

  return (
    <Form greeting={'Рады видеть!'} name={'login'} onSubmit={handleSubmit(onSubmit)}>
      <label className="entry__label register__label">
        <span className="entry__text">E-mail</span>
        <input {...register("LoginEmail",
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
        type="email" className="entry__input entry__input_email register__input register__input_email" required/>
        {errors?.LoginEmail && <span className="email-error register__error error">{errors?.LoginEmail?.message || "Что-то пошло не так..."}</span>}
      </label>
      <label className="entry__label register__label">
        <span className="entry__text">Пароль</span>
        <input {...register("loginPassword",
          {required: "Поле обязательно к заполнению",
          minLength: {
            value: 7,
          },
          maxLength: {
            value: 50,
          },
        })}
        type="password" className={errors?.loginPassword
          ? 'entry__input entry__input_password register__input register__input_password entry__input_invalid'
          : 'entry__input entry__input_password register__input register__input_password'} required/>
        {errors?.loginPassword && <span className="password-error register__error error">{errors?.loginPassword?.message || "Что-то пошло не так..."}</span>}
      </label>
      <div className="entry__button-box login__button-box">
        <button type="submit" disabled={!isValid} className={`button ${isValid ? 'entry__submit-button' : 'entry__submit-button entry__submit-button_disabled'}`}>Зарегистрироваться</button>
        <div className="entry__link-box">
          <span className='entry__proposition'>Еще не зарегистрированы?</span>
          <Link to="/signup" className='entry__link link'>Регистрация</Link>
        </div>
      </div>
    </Form>
  );
}

export default Register;
