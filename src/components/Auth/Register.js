import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import Input from "./Input/Input";

function Register({ onRegister, registerError }) {
    const handleOnRegister = (e) => {
        e.preventDefault();
        onRegister({
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        })
    }
    return (
        <div className='auth'>
            <img className="auth__logo" src={logo} alt="Логотип" />
            <h2 className="auth__title">Добро пожаловать!</h2>
            <form className="auth__form" onSubmit={handleOnRegister}>
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
                {registerError && <span className="auth__message">{registerError}</span>}
                <button className='auth__submit' type="submit">
                    Зарегистрироваться
                </button>
                <div className="auth__link-container">
                    <p className="auth__link-text">Уже зарегестрированны?</p>
                    <Link to="/signin" className="auth__link">
                        Войти
                    </Link>
                </div>
            </form>
           
        </div>
    )
}

export default Register; 