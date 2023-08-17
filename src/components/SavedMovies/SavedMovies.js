import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import filterMovies from "../../utils/filterMovies";

function SavedMovies({ onDelete, savedMovies }) {
  const [search, setSearch] = useState("");
  const [shortSavedMovies, setShortSavedMovies] = useState(false);
  const [searchSavedResults, setSearchSavedResults] = useState([]);

  useEffect(() => {
    const filteredMovies = filterMovies(
      savedMovies.map((item) => ({
        ...item,
        isLiked: true,
      })),
      shortSavedMovies,
      search
    );

    setSearchSavedResults(filteredMovies);
  }, [savedMovies, search, shortSavedMovies]);

  return (
    <section className="movies">
      <Header />
      <SearchForm
        onSubmit={setSearch}
        onShortChange={setShortSavedMovies}
        shortMovies={shortSavedMovies}
      />
      <SavedMoviesCardList list={searchSavedResults} onDelete={onDelete} />
      <Footer />
    </section>
  );
}

export default SavedMovies;
