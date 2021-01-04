import React from "react";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";

function Login () {
  return (
    <>
      <Header
        text="Регистрация"
        textColor="#FFFFFF"/>
      <main className="content">
    <form className="form">
      <h2 className="form__title">Вход</h2>
      <input className="form__input" placeholder="Email" type="email"/>
      <input className="form__input" placeholder="Пароль" type="password"/>
      <button type="submit" className="form__submit-button">Войти</button>
    </form>
      </main>
      </>
  )
}

export default Login;
