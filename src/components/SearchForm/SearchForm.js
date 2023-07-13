import React from "react";


function SearchForm() {
    return (
        <section className="searchform">
            <div className="searchform__container">
                <form className="searchform__main">
                    {/* <img src={icon} className="searchform__icon" alt="icon"></img> */}
                    <input className="searchform__input" placeholder="Фильм" type="text" minLength={2} maxLength={40} required />
                    <button type="submit" className="searchform__button"><p>Поиск</p></button>
                </form>
                <div className="searchform__addition">
                    <label className="searchform__label" htmlFor="short-films">
                        <input className="searchform__checkbox" id="short-films" type="checkbox" required/>
                        {/* <label className="searchform__label"></label> */}
                        <span className="searchform__text"></span>
                    </label>
                </div>
            </div>
        </section>
    )
}
export default SearchForm;