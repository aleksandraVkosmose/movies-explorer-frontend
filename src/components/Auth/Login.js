import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import Input from "./Input/Input";

function Login() {
    return (
        <div className='auth'>
            <img className="auth__logo" src={logo} alt="Логотип" />
            <h2 className="auth__title">Рады видеть!</h2>
            <form className="auth__form">
                <div className="auth__input-container">

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
                Войти
            </button>
            <div className="auth__link-container">
                <p className="auth__link-text">Ещё не зарегистрированы?</p>
                <Link to="/signup" className="auth__link">
                    Регистрация
                </Link>
            </div>
        </div>
    )
}
export default Login;