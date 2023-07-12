import React from "react";
import foto from "../../images/aboutMe.png"

function AboutMe() {
  return (
    <section className="about">
      <h2 className="about__subtitle subtitle__text">Студент</h2>
      <div className="about__info">
        <div className="about__info-description">
          <h1 className="about__title text_title">Александра</h1>
          <p className="about__info-subtitle">Специалист СМК, 25 лет</p>
          <p className="about__info-text text">
            Я живу в Астрахани. Закончила факультет математики и информационных технологий.
            Замужем, есть кошка. Увлекаюсь рисованием. Учусь в Яндекс.Практикуме на веб-разработчика.
          </p>
          <a href="https://github.com/aleksandraVkosmose" className="link" target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
        <img className="about__info-image" src={foto} alt="Фотография студента" />
      </div>
    </section>
  )
}
export default AboutMe;