import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useHandleResize } from "../../utils/Resize";

function MoviesCardList({ list, onSave, onDelete }) {
  const itemsPerPage = useHandleResize();
  const [currentPage, setCurrentPage] = useState(1);

  const handleOnMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + itemsPerPage.addItemsPerPage);
  };

  const startIndex = currentPage - 1;
  const endIndex = itemsPerPage.itemsPerPage + startIndex;

  const paginatedList = list.slice(0, endIndex);

  return (
    <section className="cardList">
      {!list.length ? (
        <div className="cardList__empty">Ничего не найдено</div>
      ) : (
        <ul className="movies__card">
          {paginatedList.map((movie, index) => (
            <MoviesCard
              {...movie}
              onSave={onSave}
              onDelete={onDelete}
              key={index}
            />
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
