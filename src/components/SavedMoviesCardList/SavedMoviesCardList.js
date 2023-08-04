// import React, { useState } from "react";
// import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";

// const ITEMS_PER_PAGE = 12;

// function MoviesCardList({ list, onLike, onUnLike }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const handleOnMoreClick = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
  // const paginatedList = list.slice(0, endIndex);

//   return (
//     <section className="cardList">
//       {!list.length ? (
//         <div className="cardList__empty">Ничего не найдено</div>
//       ) : (
//         <ul className="movies__card">
//           {paginatedList.map((movie, index) => (
//             <SavedMoviesCard
//               {...movie}
//               onLike={onLike}
//               onUnLike={onUnLike}
//               key={index}
//             />
//           ))}
//         </ul>
//       )}
//       {list.length > endIndex && (
//         <div className="cardList__button">
//           <button
//             onClick={handleOnMoreClick}
//             className="movies__more-films"
//           >
//             Ещё
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }
// export default MoviesCardList;