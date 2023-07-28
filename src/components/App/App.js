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
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';

function App() {
  const location = useLocation();
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [likedMovies, setLikedMovies] = useState([]);
  const navigate = useNavigate();

  const handleOnRegister = useCallback(async ({ name, email, password }) => {
    try {
      const data = await mainApi.register(name, email, password);
      if (data) {
        const loginData = await mainApi.authorize(email, password);
        if (loginData.token) {
          localStorage.setItem("jwt", loginData.token);
          setIsLoggedIn(true);
          setCurrentUser(loginData.user);
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
  }, [navigate]);

  const handleOnLogin = useCallback(async ({ email, password }) => {
    try {
      const data = await mainApi.authorize(email, password);

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
  }, [navigate]);

  const checkToken = useCallback(async () => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return;
      }
      const user = await mainApi.getUser(jwt);
      setCurrentUser(user);
      setIsLoggedIn(true);
      navigate(location);
    } catch (e) {
      console.error(e);
    }
  }, [location, navigate]);


  const loadLiked = useCallback(async () => {
    try {
      const liked = await mainApi.getMovies();
      setLikedMovies(liked);
    } catch (e) {
      console.error(e);
    }
  }, [])

  const handleOnLikeClick = useCallback(async ({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, movieId, thumbnail }) => {
    await mainApi.likeMovie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      movieId,
      thumbnail
    })
    await loadLiked();

  }, [loadLiked])

  const handleOnUnLikeClick = useCallback(async (id) => {
    await mainApi.unLikeMovie(id)
    await loadLiked();
  }, [loadLiked])


  useEffect(() => {
    checkToken();
  }, [])

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
                element={<ProfileContainer />}
              ></ProtectedRoute>
            }
          >
          </Route>
          <Route path="/movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={
                  <Movies
                    loadLiked={loadLiked}
                    onLike={handleOnLikeClick}
                    onUnLike={handleOnUnLikeClick}
                    likedMovies={likedMovies}
                  />
                }
              ></ProtectedRoute>
            }>
          </Route>
          <Route path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={
                  <SavedMovies
                    loadLiked={loadLiked}
                    likedMovies={likedMovies}
                    onUnLike={handleOnUnLikeClick}
                  />
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