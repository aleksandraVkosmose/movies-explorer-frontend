import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import Input from "./Input/Input";

function Login({ onLogin, loginError }) {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleOnSubmit = (e) => {
        e.preventDefault();
            const email = e.target.email.value;
           const password = e.target.password.value;

        if (!email) {
            setEmailError("Введите email")  
        } else {
            setEmailError("")
        }

        if (!password) {
            setPasswordError("Введите пароль")  
        } else {
            setPasswordError("")
        }

        if (!email || !password) {
            return;
        }
        onLogin({ email, password})
    }
    return (
        <div className='auth'>
            <Link to="/" className="auth__logo">
            <img className="auth__logo" src={logo} alt="Логотип" />
            </Link>
            <h2 className="auth__title">Рады видеть!</h2>
            <form className="auth__form" onSubmit={handleOnSubmit}>
                <div className="auth__input-container">
                    <Input
                        type="email"
                        name="email"
                        title="E-mail"
                        error={emailError}

                    />
                    <Input
                        type="password"
                        name="password"
                        title="Пароль"
                        error={passwordError}
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