import React, { useContext } from "react";
import Header from "../Header/Header";
import CurrentUserContext from '../../contexts/CurrentUserContext';


function Profile({ onLogout, onEdit }) {
  const currentUser = useContext(CurrentUserContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onEdit({
      name: e.target.name.value,
      email: e.target.email.value,
    })
  }

  return (
    <section className="profile">
      <Header />
      <div className="profile__container">
        <h1 className="profile__title text_title">Привет, {currentUser.name}!</h1>
        <form action="submit" className="profile__form " onSubmit={handleOnSubmit}>
          <label className="profile__label profile__label-line">
            <input
              name="name"
              type="text"
              className="profile__input"
              minLength={2}
              defaultValue={currentUser.name}
            />
          </label>
          <label className="profile__label">
            <input
              name="email"
              type="text"
              className="profile__input"
              defaultValue={currentUser.email}
            />
          </label>
          <button
            type="submit"
            className="profile__submit"

          >
            Редактировать
          </button>
        </form>
        <button className="profile__logout" type="button" onClick={onLogout}>
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;  