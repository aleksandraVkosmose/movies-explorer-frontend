import React, { useContext, useState, useEffect } from "react";
import Header from "../Header/Header";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ onLogout, onEdit, editSuccess, profileError }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const editedData = {
      name: name,
      email: email,
    };

    await onEdit(editedData);
  };

  useEffect(() => {
    setIsFormChanged(name !== currentUser.name || email !== currentUser.email);
  }, [name, email, currentUser]);

  return (
    <section className="profile">
      <Header />
      <div className="profile__container">
        <h1 className="profile__title text_title">Привет, {currentUser.name}!</h1>
        <form action="submit" className="profile__form" onSubmit={handleOnSubmit}>
          <label className="profile__label profile__label-line">
            <input
              name="name"
              type="text"
              className="profile__input"
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="profile__label">
            <input
              name="email"
              type="text"
              className="profile__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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