import React, {useEffect, useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import filterMovies from "../../utils/filterMovies";

function Movies({ onLike, onUnLike, likedMovies, loadLiked }) {
    const [search, setSearch] = useState('');
    const [shortMovies, setShortMovies] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const loadMovies = async () => {
        try {
            setError(false);
            setIsLoading(true);
            const response = await moviesApi.getMovies();
            setMovies(response);
            setIsLoaded(true);
        } catch(error) {
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
        // Get search results from local storage on mount
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
        <section className="movies">
            <Header />
            <SearchForm onSubmit={setSearch} onShortChange={setShortMovies} />
            {isLoading && <Preloader />}
            {isLoaded && !isLoading && <MoviesCardList list={searchResults} onUnLike={onUnLike} onLike={onLike} />}
            {error && <div className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</div>}
            <Footer />
        </section>
    )
}
export default Movies;