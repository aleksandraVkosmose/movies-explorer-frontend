import React, { useState } from "react";
import logo from "../../images/logo.svg";
import "./Header.css";
import account from "../../images/account.svg";
import IconCross from "../../images/cross-icon.svg";
import IconBurger from "../../images/burger-icon.svg";
import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [nav, setNav] = useState(false);

  return (
    <>
      {location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile" ? (
        <header className="header header__theme_light">
          <Link to="/">
            <img src={logo} alt="Логотип" className="header__logo" />
          </Link>
          <nav className="header__wrapper">
            <div
              className={`header__wrapper-menu ${nav ? "header__wrapper-menu_active" : ""
                }`}
            >
              <ul className="header__wrapper-movies">
                <li className="header__menu-list">
                  <NavLink
                    to="/"
                    className="header__menu-title header__main-page"
                  >
                    Главная
                  </NavLink>
                </li>
                <li className="header__menu-list">
                  <NavLink
                    to="/movies"
                    className={`header__menu-title header__movies ${location.pathname === "/movies" ? 'header__movies_theme_dark' : ''}`}
                  >
                    Фильмы
                  </NavLink>
                </li>
                <li className="header__menu-list">
                  <NavLink
                    to="/saved-movies"
                    className={`header__menu-title header__saved-movies ${location.pathname === "/saved-movies" ? 'header__movies_theme_dark' : ''}`}
                  >
                    Сохранённые фильмы
                  </NavLink>
                </li>
              </ul>
              <NavLink to="/profile" className="header__btn-account">
                <div className="dfghj">
                  <div className="header__btn-account-text">Аккаунт</div>
                  <div className="header__icon">
                    <img
                      src={account}
                      alt="Иконка аккаунта"
                      className="header__icon-account"
                    />
                  </div>
                </div>
              </NavLink>
            </div>
            <button onClick={() => setNav(!nav)} className="header__icon-btn">
              {nav ? (
                <img src={IconCross} alt="Иконка крестика" />
              ) : (
                <img src={IconBurger} alt="Иконка бургера" />
              )}
            </button>
          </nav>
        </header>
      ) : (
        <></>
      )}
      {location.pathname === "/" ? (
        <header className="header header__theme_dark">
          <Link to="/">
            <img src={logo} alt="Логотип" className="header__logo" />
          </Link>
          <nav className="header__buttons">
            <NavLink
              to="/signup"
              className="header__button header__btn-signup"
            >
              Регистрация
            </NavLink>
            <NavLink
              to="/signin"
              className="header__button header__btn-signin"
            >
              Войти
            </NavLink>
          </nav>
        </header>
      ) : (
        <></>
      )}
    </>
  );
}

export default Header;