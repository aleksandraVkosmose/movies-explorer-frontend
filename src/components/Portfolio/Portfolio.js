import React from "react";
//import arrow from "../../images/arrow.svg"

function Portfolio() {
    return (
        <section className="portfolio">
            <p className="portfolio__title">Портфолио</p>
            <div className="portfolio__list">
                <div className="portfolio__list-item">
                    <a className="portfolio__link link" href="https://github.com/aleksandraVkosmose/russian-travel">Статичный сайт<div className="portfolio__link-arrow"></div></a>
                </div>
                <div className="portfolio__list-item">
                    <a className="portfolio__link link" href="https://github.com/aleksandraVkosmose/russian-travel">Адаптивный сайт<div className="portfolio__link-arrow"></div></a>
                </div>
                <div className="portfolio__list-item">
                    <a className="portfolio__link link" href="https://github.com/aleksandraVkosmose/russian-travel">Одностраничное приложение<div className="portfolio__link-arrow"></div></a>
                </div>
            </div>
        </section>
    )
}

export default Portfolio;