import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import Input from "./Input/Input";
import {isEmail, isPassword} from "../../utils/validation";

function Login({ onLogin, loginError }) {
    const [inputError, setInputError] = useState({});
    const [inputValue, setInputValue] = useState({
        password: "",
        email: "",
    });
    const authDisabled = Object.values(inputError).some(err => err) || Object.values(inputValue).some(val => !val);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        onLogin({ email, password})
    }

    const handleOnChangeInput = (e) => {
        const inputTargetValue = e.target.value;
        const inputTargetName = e.target.name;

        let error;

        // eslint-disable-next-line default-case
        switch (inputTargetName) {
            case 'email': {
                error = isEmail(inputTargetValue);
                break;
            }
            case 'password': {
                error = isPassword(inputTargetValue);
                break;
            }
        }

        setInputError((prevState) => {
            return {...prevState, [inputTargetName]: error};
        });

        setInputValue((prevState) => ({ ...prevState, [inputTargetName]: inputTargetValue}));
    };

    return (
        <div className='auth'>
            <Link to="/" className="auth__logo">
            <img className="auth__logo" src={logo} alt="Логотип" />
            </Link>
            <h2 className="auth__title">Рады видеть!</h2>
            <form noValidate className="auth__form" onSubmit={handleOnSubmit}>
                <div className="auth__input-container">
                    <Input
                        type="email"
                        name="email"
                        title="E-mail"
                        error={inputError.email}
                        value={inputValue.email}
                        onChange={handleOnChangeInput}

                    />
                    <Input
                        type="password"
                        name="password"
                        title="Пароль"
                        error={inputError.password}
                        value={inputValue.password}
                        onChange={handleOnChangeInput}
                    />
                </div>
                {loginError && <span className="auth__message">{loginError}</span>}
                <button
                    disabled={authDisabled}
                    className={`auth__submit ${
                        !authDisabled ? "" : "auth__submit_disabled"
                    }`}
                >
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