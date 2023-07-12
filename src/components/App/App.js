import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Main from '../Main/Main';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Auth/Register'
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Login from '../Auth/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser] = useState({});
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/"
            element={<Main />}>
          </Route>
          <Route path="/signup"
            element={<Register />}>
          </Route>
          <Route path="/signin"
            element={<Login />}>
          </Route>
          <Route path="/profile"
            element={<Profile />}>
          </Route>
          <Route path="/movies"
            element={<Movies />}>
          </Route>
          <Route path="/saved-movies"
            element={<SavedMovies />} />
          <Route path="*"
            element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
