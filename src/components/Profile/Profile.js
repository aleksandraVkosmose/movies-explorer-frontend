import React from "react";
import Header from "../Header/Header";

function Profile() {
  return (
    <section className="profile">
      <Header />
      <div className="profile__container">
        <h1 className="profile__title text_title">Привет, Александра!</h1>
        <form action="submit" className="profile__form ">
          <label className="profile__label profile__label-line">
            <input
              name="name"
              type="text"
              className="profile__input"
              minLength={2}
            />
          </label>
          <label className="profile__label">
            <input
              name="email"
              type="text"
              className="profile__input"
            />
          </label>
          <button
            type="submit"
            className="profile__submit"

          >
            Редактировать
          </button>
        </form>
        <button className="profile__logout">
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;  