import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

const MAX_ITEMS_PREVIEW = 3;

function MoviesCardList({ list,  onLike, onUnLike }) {
    const [showFullList, setShowFullList] = useState(false);
    const handleOnMoreCLick = () => {
        setShowFullList(true);
    }

    const filteredList = showFullList ? list : list.slice(0, MAX_ITEMS_PREVIEW)

    return (
        <section className="cardList">
            {!list.length ?  <div className="cardList__empty">Ничего не найдено</div> :
                <ul className="movies__card">
                    {filteredList.map(movie => <MoviesCard {...movie} onLike={onLike} onUnLike={onUnLike} />)}
                </ul>
            }
            {list.length > MAX_ITEMS_PREVIEW && !showFullList && <div className="cardList__button">
                <button onClick={handleOnMoreCLick} className="movies__more-films movies__more-films-none">Ещё</button>
            </div>}
        </section>
    )
}
export default MoviesCardList