import React, { useState, useCallback, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import ProfileContainer from '../Profile/ProfileContainer';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Auth/Register'
import Login from '../Auth/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { register, authorize, getUser, getSavedMovies, saveMovie, deleteMovie  } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import moviesApi from "../../utils/MoviesApi";

function App() {
  const location = useLocation();
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  console.log(isLoggedIn)
 console.log(movies)
 console.warn(savedMovies)
  useEffect(() => {
    checkToken();
  }, [])

  const handleOnRegister = (async ({ name, email, password }) => {
    try {
      const data = await register(name, email, password);
      if (data) {
        const data = await authorize(email, password);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setCurrentUser(data.user);
          navigate("/movies");
        } else {
          setIsLoggedIn(false);
        }
      }
    } catch (e) {
      if (e === "Ошибка:( 409") {
        return setRegisterError("Пользователь с таким email уже существует");
      } else {
        return setRegisterError(
          "При регистрации пользователя произошла ошибка"
        );
      }
    }
  });

  const handleOnLogin = (async ({ email, password }) => {
    try {
      const data = await authorize(email, password);

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        navigate("/movies");
      }
    } catch (e) {
      if (e === "Ошибка:( 401") {
        return setLoginError("Вы ввели неправильный логин или пароль");
      } else {
        return setLoginError("При авторизации произошла ошибка");
      }
    }
  });

  const checkToken = (async () => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return;
      }
      const user = await getUser(jwt);
      setCurrentUser(user);
      setIsLoggedIn(true);
      navigate(location);
    } catch (e) {
      console.error(e);
    }
  });


  useEffect (() => {
    if(isLoggedIn){
    Promise.all([moviesApi.getMovies(), getSavedMovies()])
   .then((res) => {
    setMovies(res[0])
      setSavedMovies(res[1]);
    }).catch((e) => console.error(e));
    }}, [isLoggedIn])



  // const handleOnLikeClick = useCallback(async ({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, movieId, thumbnail }) => {
  //   await saveMovie({
  //     country,
  //     director,
  //     duration,
  //     year,
  //     description,
  //     image,
  //     trailerLink,
  //     nameRU,
  //     nameEN,
  //     movieId,
  //     thumbnail
  //   })
  //   await loadLiked();

  // }, [loadLiked])

  // const handleOnUnLikeClick = useCallback(async (id) => {
  //   await deleteMovie(id)
  //   await loadLiked();
  // }, [loadLiked])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/"
            element={<Main />}>
          </Route>
          <Route path="/signup"
            element={<Register onRegister={handleOnRegister} registerError={registerError} />}>
          </Route>
          <Route path="/signin"
            element={<Login onLogin={handleOnLogin} loginError={loginError} />}>
          </Route>
          <Route path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                element={ProfileContainer}
              ></ProtectedRoute>
            }
          >
          </Route>
          <Route path="/movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={
                  Movies
                    // loadLiked={loadLiked}
                    // onLike={handleOnLikeClick}
                    // onUnLike={handleOnUnLikeClick}

                  
                }
              ></ProtectedRoute>
            }>
          </Route>
          <Route path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                element={
                  
                  SavedMovies
                    // loadLiked={loadLiked}
                    
                    // onUnLike={handleOnUnLikeClick}
                  
                }
              ></ProtectedRoute>
            } />
          <Route path="*"
            element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;