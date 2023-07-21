import React, {useEffect, useMemo, useState} from "react"
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import filterMovies from "../../utils/filterMovies";

function SavedMovies({ onLike, onUnLike, loadLiked, likedMovies }) {
    const [search, setSearch] = useState('');
    const [shortMovies, setShortMovies] = useState(false);
    useEffect(() => {
        loadLiked();
    }, [])

    const list = useMemo(() => {
        return filterMovies(likedMovies.map(item => ({
            ...item,
            isLiked: true,
            savedMovieId: item._id,
        })), shortMovies, search);
    }, [likedMovies, search, shortMovies]);

    return (
        <section className="movies">
            <Header />
            <SearchForm onSubmit={setSearch} onShortChange={setShortMovies} />
            <MoviesCardList list={list} onUnLike={onUnLike} onLike={onLike} />
            <Footer />
        </section>
    )
}

export default SavedMovies;
