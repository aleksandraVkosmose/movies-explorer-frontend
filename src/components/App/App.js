import React, { useState, useCallback, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Main from '../Main/Main';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Auth/Register'
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Login from '../Auth/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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
        navigate("/signin");
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

  const handleOnLogout = useCallback(async () => {
    setIsLoggedIn(false);
    navigate("/signin");
    localStorage.removeItem("jwt");
  }, [navigate]);

  const handleOnEditProfile = useCallback(async ({email, name}) => {
    const user = await mainApi.editUser(name, email);
    setCurrentUser(user);
    navigate("/profile");
    setIsLoggedIn(true);
  }, [navigate])

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


  const loadLiked = useCallback(async() => {
    try {
      const liked = await mainApi.getMovies();
      console.log(liked)
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
                  element={<Profile onLogout={handleOnLogout} onEdit={handleOnEditProfile}/>}
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
