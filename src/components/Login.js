import React from "react";
import {Link} from "react-router-dom";

function Login () {
  return (
    <form className="form">
      <h2 className="form__title">Вход</h2>
      <input className="form__input" placeholder="Email" type="email"/>
      <input className="form__input" placeholder="Пароль" type="password"/>
      <button type="submit" className="form__submit-button">Войти</button>
    </form>
  )
}

export default Login;
