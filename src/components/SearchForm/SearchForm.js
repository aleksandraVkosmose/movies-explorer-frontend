import React, {useState} from "react";


function SearchForm({ onSubmit, onShortChange }) {
    const [search ,setSearch] = useState('');
    const [shortDuration, setShortDuration] = useState(false);
    const handleOnSubmit = (e) => {
        e.preventDefault();
        onSubmit(search);
    }

    const handleOnChange = (e) => {
        setSearch(e.target.value);
    }

    const handleOnShortClick = () => {
        const newValue = !shortDuration;
        setShortDuration(newValue);
        onShortChange(newValue);
    }

    return (
        <section className="searchform">
            <div className="searchform__container">
                <form className="searchform__main" onSubmit={handleOnSubmit}>
                    {/* <img src={icon} className="searchform__icon" alt="icon"></img> */}
                    <input name="search" className="searchform__input" placeholder="Фильм" type="text" maxLength={40} value={search} onChange={handleOnChange} />
                    <button type="submit" className="searchform__button"><p>Поиск</p></button>
                </form>
                <div className="searchform__addition">
                    <label className="searchform__label" htmlFor="short-films">
                        <input className="searchform__checkbox" id="short-films" type="checkbox" checked={shortDuration} onChange={handleOnShortClick} required/>
                        {/* <label className="searchform__label"></label> */}
                        <span className="searchform__text"></span>
                    </label>
                </div>
            </div>
        </section>
    )
}
export default SearchForm;