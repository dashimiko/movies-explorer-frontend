import {Route, Switch, useHistory,Redirect} from 'react-router-dom';
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
  const [currentUser, setCurrentUser] = useState({name: '', email: '', _id: ''});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isEntranceCompleted, setisEntranceCompleted] = useState(false);
  const [InfoTooltipText, setInfoTooltipText] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [savedCardListMovies, setsavedCardListMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false)

  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true)
      mainApi.getProfile()
      .then((user) => {
        setCurrentUser(user.user);
      }).catch((err) => console.log(err))
      .finally(()=> setIsLoader(false))
    }
  },[loggedIn]);

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
			.catch((err) => {
        console.log(err)
				handleInfoTooltipPopupClick();
        setisEntranceCompleted(false);
        setInfoTooltipText(`${err.message}`);
			})
	};

  const handleSubmitRegister = (name, email, password) => {
    Auth.register(name, email, password).then(() => {
				handleSubmitLogin(email, password);
			})
			.catch((err) => {
				handleInfoTooltipPopupClick();
        setisEntranceCompleted(false);
        setInfoTooltipText(`${err.message}`);
			});
	};

  const handleSubmitLogin = (email, password) => {
    return Auth.authorize(email, password).then((res) => {
      mainApi.updateToken(res['token']);
      setLoggedIn(true);
      if (res['token']) {
        localStorage.setItem("jwt", res['token']);
        tokenCheck();
        history.push("/movies");
      }}).catch((err) => {
          handleInfoTooltipPopupClick();
          setisEntranceCompleted(false);
          setInfoTooltipText(`${err.message}`);
        });
    };

  function handleMovieLike(movie) {
    mainApi.addSavedMovie(movie).then(res => setsavedCardListMovies([res, ...savedCardListMovies]))
    .catch(err => console.log(err));
  }

  function handleMovieDelete(movie) {
    const savedMovie = savedCardListMovies.find((i) => i.movieId === movie.id || i.movieId === movie.movieId);
    mainApi.deleteSavedMovie(savedMovie._id).then(() => {
      const newMoviesList = savedCardListMovies.filter(i => (movie.id === i.movieId || movie.movieId === i.movieId) ? false : true);
      setsavedCardListMovies(newMoviesList);
    }).catch(err => console.log(err));
  }

  const signOut = () => {
    setCurrentUser({});
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
      if (jwt) {
        setIsLoader(true)
        Auth.getContent(jwt).then((res) => {
          if (res) {
            setLoggedIn(true);
            setIsLoader(true)
            setisLoading(false);
          } else {
            setLoggedIn(false);
          }}).catch((err) => {
            console.log(err);
          })
        } else {
          setisLoading(false);
        }
  };

  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then(data => {
          const UserMoviesList = data.filter(m => m.owner === currentUser._id);
          setsavedCardListMovies(UserMoviesList.map(i => i).reverse());
        })
        .catch(err =>
          console.log(err)
        )
    }
  }, [currentUser, loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  if (isLoading) return null;

  return (

<div className="page">

<CurrentUserContext.Provider value={currentUser}>

      <Switch>

        <Route exact path='/'>
          <Main isEntrance={loggedIn}
          onBurgerClick={onBurgerClick}
          isBurgerOpen={isBurgerOpen}/>
        </Route>

        <ProtectedRoute path='/movies' loggedIn={loggedIn}>
          <Header onBurgerClick={onBurgerClick}
          isBurgerOpen={isBurgerOpen}
          isEntrance={loggedIn}/>
            <Movies savedCardListMovies={savedCardListMovies}
            onMovieLike={handleMovieLike}
            onMovieDelete={handleMovieDelete}
            isLoader={isLoader}/>
          <Footer/>
        </ProtectedRoute>

        <ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
          <Header onBurgerClick={onBurgerClick}
          isBurgerOpen={isBurgerOpen}
          isEntrance={loggedIn}/>
            <SavedMovies savedCardListMovies={savedCardListMovies}
              onMovieDelete={handleMovieDelete}
              />
          <Footer/>
        </ProtectedRoute>

        <ProtectedRoute path='/profile' loggedIn={loggedIn}>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}
          isEntrance={loggedIn}/>
          <Profile signOut={signOut} handleSubmitUserInfo={handleSubmitUserInfo}/>
        </ProtectedRoute>


        <Route path='/signup'>
        {!loggedIn ? (<Register handleSubmitRegister={handleSubmitRegister}/>
          ) : (
          <Redirect to='/'/>)}
        </Route>

        <Route path='/signin'>
        {!loggedIn ? (<Login handleSubmitLogin={handleSubmitLogin}/>
          ) : (
          <Redirect to='/'/> )}
        </Route>

        <Route path='*'>
          <NotFound historyReturn={historyReturn}/>
        </Route>

      </Switch>

      <InfoToolTip onClose={closePopup}
      isOpen={isInfoTooltipPopupOpen}
      isEntrance={isEntranceCompleted}
      text={InfoTooltipText}/>
  </CurrentUserContext.Provider>
  </div>
)};

export default App;
