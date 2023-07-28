import React from "react";
import { forwardRef } from "react";

const Techs = forwardRef((props, ref) => {
    return (
        <section className='techs' id="techs" ref={ref}>
            <h2 className="techs__subtitle subtitle_text">Технологии</h2>
            <h1 className="techs__title text_title">7 технологий</h1>
            <p className="techs__text text">
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
            <ul className="techs__list">
                <li className="techs__list-item">HTML</li>
                <li className="techs__list-item">CSS</li>
                <li className="techs__list-item">JS</li>
                <li className="techs__list-item">React</li>
                <li className="techs__list-item">Git</li>
                <li className="techs__list-item">Express.js</li>
                <li className="techs__list-item">mongoDB</li>
            </ul>
        </section>
    )
})
export default Techs;