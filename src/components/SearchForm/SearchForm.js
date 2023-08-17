import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ onSubmit, onShortChange, shortMovies }) {
  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    let storedSearchQuery;

    if (location.pathname === "/movies") {
      storedSearchQuery = localStorage.getItem("searchQueryMovies");
    } else {
      storedSearchQuery = localStorage.getItem("searchQuerySavedMovies");
    }

    if (storedSearchQuery) {
      setSearch(storedSearchQuery);
    }
  }, []);
  //
  // useEffect(() => {
  //   localStorage.setItem('searchQuery', search);
  // }, [search]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(search);
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnShortClick = () => {
    const newValue = !shortMovies;
    onShortChange(newValue);
  };

  return (
    <section className="searchform">
      <div className="searchform__container">
        <form className="searchform__main" onSubmit={handleOnSubmit}>
          <input
            name="search"
            className="searchform__input"
            placeholder="Фильм"
            type="text"
            maxLength={40}
            value={search}
            onChange={handleOnChange}
          />
          <button type="submit" className="searchform__button">
            <p>Поиск</p>
          </button>
        </form>
        <div className="searchform__addition">
          <label className="searchform__label" htmlFor="short-films">
            <input
              className="searchform__checkbox"
              id="short-films"
              type="checkbox"
              checked={shortMovies}
              onChange={handleOnShortClick}
              required
            />
            <span className="searchform__text"></span>
          </label>
        </div>
      </div>
    </section>
  );
}
export default SearchForm;
