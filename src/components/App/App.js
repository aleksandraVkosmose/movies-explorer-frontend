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
import moviesApi from "../../utils/MoviesApi";
import filterMovies from "../../utils/filterMovies";

function App() {
  const location = useLocation();
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [likedMovies, setLikedMovies] = useState([]);

  const [search, setSearch] = useState('');
  const [shortMovies, setShortMovies] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
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

  const handleOnLikeClick = useCallback(
    async ({
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
      thumbnail,
    }) => {
      try {
        const isLiked = likedMovies.some((movie) => movie.movieId === movieId);

        if (isLiked) {
          await mainApi.unLikeMovie(movieId);

          setLikedMovies((prevLikedMovies) =>
            prevLikedMovies.filter((movie) => movie.movieId !== movieId)
          );
        } else {
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
            thumbnail,
          });

          setLikedMovies((prevLikedMovies) => [
            ...prevLikedMovies,
            {
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
              thumbnail,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [likedMovies]
  );

  const handleOnUnLikeClick = useCallback(async (id) => {
    await mainApi.unLikeMovie(id)
    await loadLiked();
  }, [loadLiked])


  useEffect(() => {
    checkToken();
  }, [])

  const loadMovies = async () => {
    try {
      setError(false);
      setIsLoading(true);
      const response = await moviesApi.getMovies();
      setMovies(response);
      setIsLoaded(true);
    } catch (error) {
      setError(true);
      console.error('error', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadLiked();
    loadMovies();
  }, [loadLiked])

  useEffect(() => {
    const storedSearchResults = localStorage.getItem('searchResults');
    if (storedSearchResults) {
      setSearchResults(JSON.parse(storedSearchResults));
    }
  }, []);

  useEffect(() => {
    const filteredMovies = filterMovies(
      movies.map(item => {
        const savedMovie = likedMovies.find(likedMovie => likedMovie.movieId === item.id);
        return {
          country: item.country,
          director: item.director,
          duration: item.duration,
          year: item.year,
          description: item.description,
          image: moviesApi._baseUrl + item.image.url,
          thumbnail: moviesApi._baseUrl + item.image.formats.thumbnail.url,
          trailerLink: item.trailerLink,
          nameRU: item.nameRU,
          nameEN: item.nameEN,
          movieId: item.id,
          savedMovieId: savedMovie ? savedMovie._id : null,
          isLiked: !!savedMovie,
        }
      }),
      shortMovies,
      search
    );

    setSearchResults(filteredMovies);
  }, [movies, likedMovies, shortMovies, search]);

  useEffect(() => {
    localStorage.setItem('searchResults', JSON.stringify(searchResults));
    localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
  }, [searchResults, shortMovies]);

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
                    setSearch={setSearch}
                    searchResults={searchResults}
                    setShortMovies={setShortMovies}
                    isLoading={isLoading}
                    isLoaded={isLoaded}
                    error={error}
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