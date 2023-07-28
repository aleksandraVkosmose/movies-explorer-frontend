import React, { useState, useEffect } from "react";


function SearchForm({ onSubmit, onShortChange }) {
    const [search ,setSearch] = useState('');
    const [shortDuration, setShortDuration] = useState(false);
    console.log(shortDuration)
    useEffect(() => {
    const storedSearchQuery = localStorage.getItem('searchQuery');
    const storedShortDuration = localStorage.getItem('shortDuration');

    if (storedSearchQuery) {
      setSearch(storedSearchQuery);
    }

    if (storedShortDuration) {
      setShortDuration(storedShortDuration === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchQuery', search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem('shortDuration', JSON.stringify(shortDuration));
  }, [shortDuration]);
    
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