import React from "react";
//import arrow from "../../images/arrow.svg"

function Portfolio() {
    return (
        <section className="portfolio">
            <p className="portfolio__title">Портфолио</p>
            <ul className="portfolio__list">
                <li className="portfolio__list-item">
                    <a className="portfolio__link link" href="https://github.com/aleksandraVkosmose/russian-travel">Статичный сайт</a>
                </li>
                <li className="portfolio__list-item">
                    <a className="portfolio__link link" href="https://github.com/aleksandraVkosmose/russian-travel">Адаптивный сайт</a>
                </li>
                <li className="portfolio__list-item">
                    <a className="portfolio__link link" href="https://github.com/aleksandraVkosmose/russian-travel">Одностраничное приложение</a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;