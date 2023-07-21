import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import Input from "./Input/Input";

function Login({ onLogin, loginError }) {
    const handleOnSubmit = (e) => {
        e.preventDefault();
        onLogin({
            email: e.target.email.value,
            password: e.target.password.value,
        })
    }
    return (
        <div className='auth'>
            <img className="auth__logo" src={logo} alt="Логотип" />
            <h2 className="auth__title">Рады видеть!</h2>
            <form className="auth__form" onSubmit={handleOnSubmit}>
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
                {loginError && <span className="auth__message">{loginError}</span>}
                <button className='auth__submit'>
                    Войти
                </button>
            </form>
         
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