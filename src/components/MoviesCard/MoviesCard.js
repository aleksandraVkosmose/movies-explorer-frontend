import React from "react";
import pic1 from "../../images/pic1.svg"
import pic2 from "../../images/pic2.svg"
import pic3 from "../../images/pic3.svg"
import pic4 from "../../images/pic4.svg"
import pic5 from "../../images/pic5.svg"
import pic6 from "../../images/pic6.svg"
import pic7 from "../../images/pic7.svg"
import pic8 from "../../images/pic8.svg"
import pic9 from "../../images/pic9.svg"
import pic10 from "../../images/pic10.svg"
import pic11 from "../../images/pic11.svg"
import pic12 from "../../images/pic12.svg"

function MoviesCard() {
    return (
        <ul className="movies__card">
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic1} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">33 слова о дизайне</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 47м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic2} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">Киноальманах «100 лет дизайна»</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 3м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic3} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">В погоне за Бенкси</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 42м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic4} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">Баския: Взрыв реальности</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 21м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic5} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">Бег это свобода</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 44м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic6} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">Книготорговцы</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 37м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic7} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">Когда я думаю о Германии ночью</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 56м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic8} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">Gimme Danger: История Игги и The Stooge...</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 59м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic9} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">Дженис: Маленькая девочка грустит</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 42м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic10} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">Соберись перед прыжком</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 10м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic11} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">Пи Джей Харви: A dog called money</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 4м</p>
                </div>
            </li>
            <li className="movies__card-item">
                <a href={"/movies"}>
                    <img className="movies__card-image" src={pic12} alt="карточка фильма"></img>
                </a>
                <div className="movies__card-container">
                    <div className="movies__card-subcontainer">
                        <h2 className="movies__card-title">По волнам: Искусство звука в кино</h2>
                        <button className="card__favorite"></button>
                    </div>
                    <p className="movies__card-movie-time">1ч 7м</p>
                </div>
            </li>
        </ul>
    )
}
export default MoviesCard;