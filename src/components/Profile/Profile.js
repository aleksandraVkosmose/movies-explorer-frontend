import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import {isEmail, isName} from "../../utils/validation";

function Profile({ onLogout, onEdit, editSuccess, profileError, currentUser }) {
  const [inputValue, setInputValue] = useState({
    name: currentUser?.name,
    email: currentUser?.email,
  });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [inputError, setInputError] = useState({});
  const [successEdit, setSuccessEdit] = useState(editSuccess);

  const submitDisabled = Object.values(inputError).some(err => err) || !isFormChanged;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const editedData = {
      name: inputValue.name,
      email: inputValue.email,
    };

    await onEdit(editedData);
  };

  useEffect(() => {
    setIsFormChanged(inputValue.name !== currentUser?.name || inputValue.email !== currentUser?.email);
  }, [inputValue, currentUser]);

  useEffect(() => {
    setSuccessEdit(editSuccess);
  }, [editSuccess])

  const handleOnChangeInput = (e) => {
    const inputTargetValue = e.target.value;
    const inputTargetName = e.target.name;

    setSuccessEdit(false);

    let error;

    // eslint-disable-next-line default-case
    switch (inputTargetName) {
      case 'email': {
        error = isEmail(inputTargetValue);
        break;
      }
      case 'name': {
        error = isName(inputTargetValue);
        break;
      }
    }

    setInputError((prevState) => {
      return {...prevState, [inputTargetName]: error};
      });

    setInputValue((prevState) => ({ ...prevState, [inputTargetName]: inputTargetValue}));
  };

  return (
      <section className="profile">
        <Header />
        <div className="profile__container">
          <h1 className="profile__title text_title">Привет, {currentUser?.name}!</h1>
          <form noValidate action="submit" className="profile__form" onSubmit={handleOnSubmit}>
            <label className="profile__label profile__label-line">
              <input
                  name="name"
                  type="text"
                  className="profile__input"
                  value={inputValue.name}
                  onChange={handleOnChangeInput}
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
              />
              <span className={`input-error ${inputError.email && "input-error_visible"}`}>{inputError.email}</span>
            </label>

            <button
                type="submit"
                className={`profile__submit ${
                    !submitDisabled ? "" : "profile__submit_disabled"
                }`}
                disabled={submitDisabled}
            >
              Редактировать
            </button>
          </form>
          {successEdit && <p className="profile__span">Успешно отредактировано!</p>}
          {profileError && <p className="profile__error">{profileError}</p>}
          <button className="profile__logout" type="button" onClick={onLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </section>
  );
}

export default Profile;