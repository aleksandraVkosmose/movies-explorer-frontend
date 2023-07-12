import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
    return (
        <section className="cardList">
            <MoviesCard />
            <div className="button__container">
                <button className="movies__more-films movies__more-films-none">Ещё</button>
            </div>
        </section>
    )
}
export default MoviesCardList