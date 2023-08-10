import React, { useState, useEffect } from "react";
import Header from "../Header/Header";

function Profile({ onLogout, onEdit, editSuccess, profileError, currentUser }) {
  const [inputValue, setInputValue] = useState({
    name: currentUser?.name,
    email: currentUser?.email,
  });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [inputError, setInputError] = useState({});

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log('subm')
    const editedData = {
      name: inputValue.name,
      email: inputValue.email,
    };

    setInputError( {
        email: (!editedData.email || !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(editedData.email)) ? "Введите корректный email" : ""),
        name: (!editedData.name || !(/^[a-zA-Zа-яА-Я ]+$/.test(inputValue) ? "Введите корректное имя" : "")),

    });

    if (!editedData.email || !editedData.name) {
      return;
    }

    await onEdit(editedData);
  };

  useEffect(() => {
    setIsFormChanged(inputValue.name !== currentUser?.name || inputValue.email !== currentUser?.email);
  }, [inputValue, currentUser]);

  const handleOnChangeInput = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    setInputValue((prevState) => ({ ...prevState, [inputName]: inputValue}));
  };

  return (
    <section className="profile">
      <Header />
      <div className="profile__container">
        <h1 className="profile__title text_title">Привет, {currentUser?.name}!</h1>
        <form action="submit" className="profile__form" onSubmit={handleOnSubmit}>
          <label className="profile__label profile__label-line">
            <input
              name="name"
              type="text"
              className="profile__input"
              minLength={2}
              value={inputValue.name}
              onChange={handleOnChangeInput}
              required
            />
            <span className={`input-error ${inputError.name && "input-error_visible"}`}>{inputError.name}</span>
          </label>
          <label className="profile__label">
            <input
              name="email"
              type="text"
              className="profile__input"
              value={inputValue.email}
              onChange={handleOnChangeInput}
              required
            />
            <span className={`input-error ${inputError.email && "input-error_visible"}`}>{inputError.email}</span>
          </label>

          <button
            type="submit"
            className="profile__submit"
            disabled={!isFormChanged}
          >
            Редактировать
          </button>
        </form>
        {editSuccess && <p className="profile__span">Успешно отредактировано!</p>}
        {profileError && <p className="profile__error">{profileError}</p>}
        <button className="profile__logout" type="button" onClick={onLogout}>
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;