import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import filterMovies from "../../utils/filterMovies";
import moviesApi from "../../utils/MoviesApi";

function Movies({
  onSave,
  onDelete,
  allMovies,
  savedMovies,
  isLoaded,
  error,
  isLoading,
}) {
  const [search, setSearch] = useState("");
  const [shortMovies, setShortMovies] = useState(() => {
    const shortFilms = localStorage.getItem("shortMovies");
    return shortFilms ? JSON.parse(shortFilms) : false;
  });

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem("searchQueryMovies");

    if (storedSearchQuery) {
      setSearch(storedSearchQuery);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQueryMovies", search);
  }, [search]);

  useEffect(() => {
    const filteredMovies = filterMovies(
      allMovies.map((item) => {
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
          isLiked: item.isLiked,
        };
      }),
      shortMovies,
      search
    );
    setSearchResults(filteredMovies);
  }, [allMovies, savedMovies, shortMovies, search]);

  useEffect(() => {
    localStorage.setItem("shortMovies", JSON.stringify(shortMovies));
  }, [shortMovies]);

  return (
    <section className="movies">
      <Header />
      <SearchForm
        onSubmit={setSearch}
        onShortChange={setShortMovies}
        shortMovies={shortMovies}
      />
      {isLoading && <Preloader />}
      {isLoaded && !isLoading && (
        <MoviesCardList
          list={searchResults}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
      {error && (
        <div className="movies__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </div>
      )}
      <Footer />
    </section>
  );
}
export default Movies;
