import { useState } from "react";
import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";
import { useHandleResize } from "../../utils/Resize";

function MoviesCardList({ list, onDelete }) {
  const itemsPerPage = useHandleResize();
  const [currentPage, setCurrentPage] = useState(1);

  const handleOnMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + itemsPerPage.addItemsPerPage);
  };

  const startIndex = currentPage - 1;
  const endIndex = startIndex + itemsPerPage.itemsPerPage;
  const paginatedList = list.slice(0, endIndex);

  return (
    <section className="cardList">
      {!list.length ? (
        <div className="cardList__empty">Ничего не найдено</div>
      ) : (
        <ul className="movies__card">
          {paginatedList.map((movie, index) => (
            <SavedMoviesCard {...movie} onDelete={onDelete} key={index} />
          ))}
        </ul>
      )}
      {list.length > endIndex && (
        <div className="cardList__button">
          <button onClick={handleOnMoreClick} className="movies__more-films">
            Ещё
          </button>
        </div>
      )}
    </section>
  );
}
export default MoviesCardList;
