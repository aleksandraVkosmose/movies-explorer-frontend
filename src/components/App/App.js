import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./App.css";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import ProfileContainer from "../Profile/ProfileContainer";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import {
  register,
  authorize,
  getUser,
  getSavedMovies,
  saveMovie,
  deleteMovie,
  editUser,
} from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const location = useLocation();
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [editSuccess, setEditSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const handleOnRegister = async ({ name, email, password }) => {
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
  };

  const handleOnLogin = async ({ email, password }) => {
    try {
      const data = await authorize(email, password);

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setCurrentUser(data.user);
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
  };

  const checkToken = async () => {
    try {
      const user = await getUser();
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate(location);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnEditProfile = (async ({ email, name }) => {
    try {
      setEditSuccess(false); // Reset editSuccess to false at the start of the editing process
      setProfileError(""); // Clear any previous errors before attempting to edit
      const user = await editUser(name, email);
      setCurrentUser(user);
      setEditSuccess(true); // Set editSuccess to true upon successful editing
      navigate("/profile");
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 409) {
        setProfileError("Пользователь с таким email уже существует");
      } else {
        setProfileError("При обновлении профиля произошла ошибка");
      }
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      setIsLoaded(false);
      Promise.all([moviesApi.getMovies(), getSavedMovies()])
        .then((res) => {
          const movies = res[0];
          const savedMovies = res[1];

          const updatedMovies = movies.map((movie) => {
            const savedMovie = savedMovies.find(
              (saved) => saved.movieId === movie.id
            );
            if (savedMovie) {
              return { ...movie, isLiked: true, key: movie.id };
            }
            return { ...movie, isLiked: false, key: movie.id };
          });

          const updatedSavedMovies = savedMovies.map((movie) => {
            return { ...movie, isLiked: true, key: movie._id };
          });

          setMovies(updatedMovies);
          setSavedMovies(updatedSavedMovies);

          setIsLoading(false);
          setIsLoaded(true);
        })
        .catch((e) => {
          setError(true);
          console.error(e);
        });
    }
  }, [isLoggedIn]);

  const handleSaveCard = async ({
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
    const newSaveMovie = await saveMovie({
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

    setSavedMovies((prevMovies) => [...prevMovies, newSaveMovie]);

    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, isLiked: true } : movie
      )
    );
  };

  const handleDeleteCard = async (id) => {
    const dMovie = savedMovies.find((savedMovie) => savedMovie.movieId === id);
  
    await deleteMovie(dMovie._id);
    setSavedMovies((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== dMovie._id)
    );
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isLiked: false } : movie
      )
    );
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleOnRegister}
                registerError={registerError}
              />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleOnLogin} loginError={loginError} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                element={ProfileContainer}
                onEdit={handleOnEditProfile}
                editSuccess={editSuccess}
                profileError={profileError}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                allMovies={movies}
                savedMovies={savedMovies}
                onSave={handleSaveCard}
                onDelete={handleDeleteCard}
                error={error}
                isLoaded={isLoaded}
                isLoading={isLoading}
                element={Movies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                onDelete={handleDeleteCard}
                isLoading={isLoading}
                element={SavedMovies}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;