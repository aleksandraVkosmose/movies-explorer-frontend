import React from "react";

function SavedMoviesCard({ duration, movieId, onDelete, nameRU, trailerLink, isLiked, image}) {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;

    const handleOnLikeClick = () => {
        onDelete(movieId);
    }

    return (
        <li className="movies__card-item">
            <a href={trailerLink}>
                <img className="movies__card-image" src={image} alt="карточка фильма"></img>
            </a>
            <div className="movies__card-container">
                <div className="movies__card-subcontainer">
                    <h2 className="movies__card-title">{nameRU}</h2>
                    <button onClick={handleOnLikeClick} className={`card__cross ${isLiked ? 'card__cross_liked' : ''}`}></button>
                </div>
                <p className="movies__card-movie-time">{hours}ч {minutes}м</p>
            </div>
        </li>
    )
}
export default SavedMoviesCard;
