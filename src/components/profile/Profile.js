import { Link } from 'react-router-dom';
import {useState, useContext, useEffect} from 'react';
import { useForm } from "react-hook-form";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile({signOut, handleSubmitUserInfo}) {

  const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const {
    register,
    formState : {
      errors, isValid
    },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
			name: currentUser.name,
			email: currentUser.email,
		},
  });

  function handleNameChange(event) {
		setName(event.target.value);
    setValue('name', event.target.value);
	};

	function handleEmailChange(event) {
		setEmail(event.target.value);
    setValue('email', event.target.value);
	};

  function handleUserInfo() {
    console.log(name, email)
		handleSubmitUserInfo(name, email);
    reset();
	}

	useEffect(() => {
		setName(currentUser.name);
		setEmail(currentUser.email);
    setValue('name', currentUser.name);
    setValue('email', currentUser.email)
	}, [currentUser]);

  useEffect(() => {
    if (name === currentUser.name && email === currentUser.email) {
			setIsDisabledButton(true);
		} else if (isValid) {
			setIsDisabledButton(false);
		} else if (!isValid) {
			setIsDisabledButton(true);
		}
	}, [currentUser.name, currentUser.email, isValid, name, email]);

  return (
  <main>
    <section className="profile section">
      <h2 className="profile__title">{`Привет, ${name}!`}</h2>
      <form className="profile__form" noValidate onSubmit={handleSubmit(handleUserInfo)}>
        <div className="profile__form-box">
        <label className="profile__info">
        {errors?.name && <span className="name-error profile__error error">{errors?.name?.message || "Что-то пошло не так..."}</span>}
          <span className="profile__value profile__value_name">Имя</span>
          <input {...register("name",
          {required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: 'Должно быть минимум два символа'
          },
          maxLength: {
            value: 30,
            message: 'Должно быть максимум 30 символов'
          },
          pattern: {
            value: /^[А-ЯA-ZёәіңғүұқөһӘІҢҒҮҰҚӨҺ[\]h-]+$/umi,
            message: 'Допустимы только латиница, кириллица, пробелы и дефисы'
          },
          onChange: (e) => handleNameChange(e),
          })}
          value={name || ""}
          type="text"
          className="profile__input profile__input_name"
          placeholder={name || ""}/>
        </label>
        <label className="profile__info">
          <span className="profile__value">E-mail</span>
          <input {...register("email",
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
        type="email"
        className = "profile__input profile__input_email"
        placeholder={email || ""}
        minLength="2"
        maxLength="30"
        required/>
          {errors?.email && <span className="email-error profile__error error">{errors?.email?.message || "Что-то пошло не так..."}</span>}
        </label>
        </div>
        <div className="profile__button-box">
          <button type="submit" disabled={isDisabledButton} className='button profile__submit-button'>Редактировать</button>
          <Link onClick={signOut} to="/" className='profile__link link'>Выйти из аккаунта</Link>
        </div>
      </form>
    </section>
  </main>
  );
}

export default Profile;
