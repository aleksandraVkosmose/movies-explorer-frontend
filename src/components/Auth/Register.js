import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import Input from "./Input/Input";
import {isEmail, isName, isPassword} from "../../utils/validation";

function Register({ onRegister, registerError }) {
    const [errors, setErrors] = useState({});
    const [inputValue, setInputValue] = useState({
        password: "",
        email: "",
    });
    const registerDisabled = Object.values(errors).some(err => err) || Object.values(inputValue).some(val => !val);

    const handleOnRegister = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const emailErrorMessage = isEmail(email);
        const nameErrorMessage = isName(name);
        const passwordErrorMessage = isPassword(password);
        const errorMessages = {
            email: emailErrorMessage,
            name: nameErrorMessage,
            password: passwordErrorMessage,
        };

        setErrors(errorMessages);

        if (Object.values(errorMessages).some(err => err)) {
            return;
        }

        onRegister({ name, email, password });
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

        setErrors((prevState) => {
            return {...prevState, [inputTargetName]: error};
        });

        setInputValue((prevState) => ({ ...prevState, [inputTargetName]: inputTargetValue}));
    };

    return (
        <div className='auth'>
            <Link to="/" className="auth__logo">
            <img className="auth__logo" src={logo} alt="Логотип" />
            </Link>
            <h2 className="auth__title">Добро пожаловать!</h2>
            <form noValidate className="auth__form" onSubmit={handleOnRegister}>
                <div className="auth__input-container">
                    <Input
                        type="text"
                        name="name"
                        title="Имя"
                        error={errors.name}
                        value={inputValue.name}
                        onChange={handleOnChangeInput}
                    />
                    <Input
                        type="email"
                        name="email"
                        title="E-mail"
                        error={errors.email}
                        value={inputValue.email}
                        onChange={handleOnChangeInput}
                    />
                    <Input
                        type="password"
                        name="password"
                        title="Пароль"
                        error={errors.password}
                        onChange={handleOnChangeInput}
                    />
                </div>
                {registerError && <span className="auth__message">{registerError}</span>}
                <button
                    type="submit"
                    disabled={registerDisabled}
                    className={`auth__submit ${
                        !registerDisabled ? "" : "auth__submit_disabled"
                    }`}
                >
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