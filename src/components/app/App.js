import {Route, Switch, useHistory} from 'react-router-dom';
import {useState,useEffect} from 'react';
import Main from '../main/Main';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Movies from '../movies/Movies';
import SavedMovies from '../savedMovies/SavedMovies';
import Profile from '../profile/Profile';
import Register from '../register/Register';
import Login from '../login/Login';
import NotFound from '../notFound/NotFound';
import InfoToolTip from '../infoToolTip/InfoToolTip';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import {mainApi} from '../../utils/MainApi';
import * as Auth from '../../utils/auth';

function App() {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: '', email: ''});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isEntranceCompleted, setisEntranceCompleted] = useState(false);
  const [InfoTooltipText, setInfoTooltipText] = useState('');
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getProfile()
      .then((user) => {
        console.log(user)
        setCurrentUser(user.user);
        console.log(user.user);
      }).catch((err) => console.log(err));
    }},[loggedIn]);

  function onBurgerClick() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  function closePopup() {
    setIsInfoTooltipPopupOpen(false);
  }

  function historyReturn() {
    history.goBack();
  }

  function handleInfoTooltipPopupClick() {
    setIsInfoTooltipPopupOpen(true);
  }

  const handleSubmitUserInfo = (name, email) => {
		mainApi.editProfile(name, email)
			.then((res) => {
        console.log(res)
				setCurrentUser({
          name: res.name,
          email: res.email,
        });
        handleInfoTooltipPopupClick();
        setisEntranceCompleted(true);
        setInfoTooltipText('Данные обновлены');
			})
			.catch(() => {
				handleInfoTooltipPopupClick();
        setisEntranceCompleted(false);
        setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
			})
	};

  const handleSubmitRegister = (name, email, password) => {
    Auth.register(name, email, password).then(() => {
				handleSubmitLogin(email, password);
			})
			.catch(() => {
				handleInfoTooltipPopupClick();
        setisEntranceCompleted(false);
        setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
			});
	};

  const handleSubmitLogin = (email, password) => {
    return Auth.authorize(email, password).then((res) => {
      mainApi.updateToken(res['token']);
      setLoggedIn(true);
      if (res['token']) {
        localStorage.setItem("jwt", res['token']);
        tokenCheck();
      }}).catch((err) => {
          console.log(err);
          handleInfoTooltipPopupClick();
          setisEntranceCompleted(false);
          setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
        })
    };

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
      if (jwt) {
        Auth.getContent(jwt).then((res) => {
          if (res) {
            setLoggedIn(true);
            setisLoading(false);
            history.push("/movies");
          }}).catch((err) => {
            console.log(err);
          })
        } else {
          setisLoading(false);
          console.log('что тут у нас')
        }
    };

    useEffect(() => {
      tokenCheck();
    }, []);

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  };

  if (isLoading) return null;

  return (

<div className="page">

<CurrentUserContext.Provider value={currentUser}>
      <Switch>

        <Route exact path='/'>
          <Main isEntrance={loggedIn} onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
        </Route>

        <ProtectedRoute path='/movies' loggedIn={loggedIn}>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen} isEntrance={loggedIn}/>
            <Movies/>
          <Footer/>
        </ProtectedRoute>

        <ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen} isEntrance={loggedIn}/>
            <SavedMovies/>
          <Footer/>
        </ProtectedRoute>

        <ProtectedRoute path='/profile' loggedIn={loggedIn}>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen} isEntrance={loggedIn}/>
          <Profile signOut={signOut} handleSubmitUserInfo={handleSubmitUserInfo}/>
        </ProtectedRoute>

        <Route path='/signup'>
          <Register handleSubmitRegister={handleSubmitRegister}/>
        </Route>

        <Route path='/signin'>
          <Login handleSubmitLogin={handleSubmitLogin}/>
        </Route>

        <Route path='*'>
          <NotFound historyReturn={historyReturn}/>
        </Route>

      </Switch>

      <InfoToolTip onClose={closePopup} isOpen={isInfoTooltipPopupOpen} isEntrance={isEntranceCompleted} text={InfoTooltipText}/>
  </CurrentUserContext.Provider>
  </div>
)};

export default App;
