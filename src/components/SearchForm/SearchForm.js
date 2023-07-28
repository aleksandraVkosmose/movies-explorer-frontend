import React, { useState, useEffect } from "react";


function SearchForm({ onSubmit, onShortChange, saveData }) {
    const [search ,setSearch] = useState('');
    const [shortDuration, setShortDuration] = useState(false);

    useEffect(() => {
        if (!saveData) {
            return;
        }

        const storedSearchQuery = localStorage.getItem('searchQuery');
        const storedShortDuration = localStorage.getItem('shortDuration');
        console.log(storedShortDuration === 'true');

        if (storedSearchQuery || storedSearchQuery === '') {
            onSubmit(storedSearchQuery);
            setSearch(storedSearchQuery);
        }

        if (storedShortDuration) {
            setShortDuration(storedShortDuration === 'true');
            onShortChange(storedShortDuration === 'true');
        }
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        onSubmit(search);
    }

    const handleOnChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (saveData) {
            localStorage.setItem('searchQuery', value);
        }
    }

    const handleOnShortClick = () => {
        const newValue = !shortDuration;
        setShortDuration(newValue);
        onShortChange(newValue);

        if (saveData) {
            localStorage.setItem('shortDuration', newValue);
        }
    }

    return (
        <section className="searchform">
            <div className="searchform__container">
                <form className="searchform__main" onSubmit={handleOnSubmit}>
                    <input name="search" className="searchform__input" placeholder="Фильм" type="text" maxLength={40} value={search} onChange={handleOnChange} />
                    <button type="submit" className="searchform__button"><p>Поиск</p></button>
                </form>
                <div className="searchform__addition">
                    <label className="searchform__label" htmlFor="short-films">
                        <input className="searchform__checkbox" id="short-films" type="checkbox" checked={shortDuration} onChange={handleOnShortClick} required/>
                        <span className="searchform__text"></span>
                    </label>
                </div>
            </div>
        </section>
    )
}
export default SearchForm;