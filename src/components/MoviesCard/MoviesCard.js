import React from "react";

function MoviesCard({ country, director, duration, year, description, image, trailerLink,nameRU, nameEN, movieId, thumbnail, isLiked, onLike, onUnLike, savedMovieId,  }) {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;

    const handleOnLikeClick = () => {
        if (isLiked) {
            onUnLike(savedMovieId);
        } else {
            onLike({
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                nameRU,
                nameEN,
                movieId,
                thumbnail,
            });
        }
    }

    return (
        <li className="movies__card-item">
            <a href={trailerLink}>
                <img className="movies__card-image" src={image} alt="карточка фильма"></img>
            </a>
            <div className="movies__card-container">
                <div className="movies__card-subcontainer">
                    <h2 className="movies__card-title">{nameRU}</h2>
                    <button onClick={handleOnLikeClick} className={`card__favorite ${isLiked ? 'card__favorite_liked' : ''}`}></button>
                </div>
                <p className="movies__card-movie-time">{hours}ч {minutes}м</p>
            </div>
        </li>
    )
}
export default MoviesCard;