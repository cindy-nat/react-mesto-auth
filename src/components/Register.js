import React from "react";
import {Link} from "react-router-dom";

function Register () {
  return (
    <form className="form">
      <h2 className="form__title">Регистрация</h2>
      <input className="form__input" placeholder="Email" type="email"/>
      <input className="form__input" placeholder="Пароль" type="password"/>
      <button type="submit" className="form__submit-button">Зарегестрироваться</button>
      <p className="form__text">Уже зарегистрированы? <Link to="/sign-in" className="form__link">Войти</Link></p>
    </form>
  )
}

export default Register;
