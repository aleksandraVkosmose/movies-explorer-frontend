import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import Input from "./Input/Input";

function Register() {
    return (
        <div className='auth'>
            <img className="auth__logo" src={logo} alt="Логотип" />
            <h2 className="auth__title">Добро пожаловать!</h2>
            <form className="auth__form">
                <div className="auth__input-container">
                    <Input
                        type="text"
                        name="name"
                        title="Имя"

                    />
                    <Input
                        type="email"
                        name="email"
                        title="E-mail"
                    />
                    <Input
                        type="password"
                        name="password"
                        title="Пароль"
                    />
                </div>
            </form>
            <span className="auth__message">Что-то пошло не так...</span>
            <button className='auth__submit'>
                Зарегистрироваться
            </button>
            <div className="auth__link-container">
                <p className="auth__text">Уже зарегестрированны?</p>
                <Link to="/signin" className="auth__link">
                    Войти
                </Link>
            </div>
        </div>
    )
}

export default Register; 