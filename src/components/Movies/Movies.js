import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Movies({ onLike, onUnLike, setSearch, searchResults, setShortMovies, isLoading, isLoaded, error }) {


    return (
        <section className="movies">
            <Header />
            <SearchForm onSubmit={setSearch} onShortChange={setShortMovies} saveData />
            {isLoading && <Preloader />}
            {isLoaded && !isLoading && <MoviesCardList list={searchResults} onUnLike={onUnLike} onLike={onLike} />}
            {error && <div className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</div>}
            <Footer />
        </section>
    )
}
export default Movies;