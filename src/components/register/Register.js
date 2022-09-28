import {useState} from 'react';
import { Link } from 'react-router-dom';
import Form from "../form/Form";
import {useForm} from "react-hook-form";

function Register({handleSubmitRegister}) {

  const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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

  function handleNameChange(event) {
		setName(event.target.value);
	};

	function handleEmailChange(event) {
		setEmail(event.target.value);
	};

	function handlePasswordChange(event) {
		setPassword(event.target.value);
	};

  const handleRegister = () => {
    handleSubmitRegister(name, password, email);
    reset();
  };

  return (
    <Form greeting={'Добро пожаловать!'} name={'register'} onSubmit={handleSubmit(handleRegister)}>
      <label className="entry__label register__label">
        <span className="entry__text">Имя</span>
        <input
        {...register("RegisterName",
        {required: "Поле обязательно к заполнению",
        minLength: {
          value: 2,
          message: 'Должно быть минимум два символа'
        },
        maxLength: {
          value: 30,
          message: 'Должно быть максимум 30 символов'
        },
        onChange: (e) => handleNameChange(e),
        })}
        value={name || ""}
        type="text" className="entry__input register__input register__input_name" required/>
        {errors?.RegisterName && <span className="register__error error">{errors?.RegisterName?.message || "Что-то пошло не так..."}</span>}
      </label>
      <label className="entry__label register__label">
        <span className="entry__text">E-mail</span>
        <input {...register("RegisterEmail",
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
          },
          onChange: (e) => handleEmailChange(e),
        })}
        value={email || ""}
        type="email" className='entry__input entry__input_email register__input register__input_email' required/>
        {errors?.RegisterEmail && <span className="email-error register__error error">{errors?.RegisterEmail?.message || "Что-то пошло не так..."}</span>}
      </label>
      <label className="entry__label register__label">
        <span className="entry__text">Пароль</span>
        <input {...register("userPassword",
          {required: "Поле обязательно к заполнению",
          minLength: {
            value: 7,
          },
          maxLength: {
            value: 50,
          },
          onChange: (e) => handlePasswordChange(e),
        })}
        value={password || ""}
        type="password" className={errors?.userPassword
          ? 'entry__input entry__input_password register__input register__input_password entry__input_invalid'
          : 'entry__input entry__input_password register__input register__input_password'} required/>
        {errors?.userPassword && <span className="password-error register__error error">{errors?.userPassword?.message || "Что-то пошло не так..."}</span>}
      </label>
      <div className="entry__button-box register__button-box">
        <button disabled={!isValid} className={`button ${isValid ? 'entry__submit-button' : 'entry__submit-button entry__submit-button_disabled'}`} type="submit" >Зарегистрироваться</button>
        <div className="entry__link-box">
          <span className='entry__proposition'>Уже зарегистрированы?</span>
          <Link to="/signin" className='entry__link link'>Войти</Link>
        </div>
      </div>
    </Form>
  );
}

export default Register;
