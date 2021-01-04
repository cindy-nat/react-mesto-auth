import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import * as Auth from '../utils/auth';
import InfoTooltip from "./InfoTooltip";

function Register () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [infoTooltipIsOpened, setInfoTooltip] = React.useState(false);


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.register(email, password)
      .then(data=>{
        if(data) {
          setInfoTooltip(true);
        }
      })
      .catch(err=>console.log(err));
  }

  const closePopup = () => setInfoTooltip(false);


  return (
    <>
      <Header
        text="Войти"
        textColor="#FFFFFF"
        link = "sign-in"/>
      <main className="content">
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Регистрация</h2>
      <input className="form__input" placeholder="Email" type="email" onChange={handleEmailChange}/>
      <input className="form__input" placeholder="Пароль" type="password" onChange={handlePasswordChange}/>
      <button type="submit" className="form__submit-button">Зарегестрироваться</button>
      <p className="form__text">Уже зарегистрированы? <Link to="/sign-in" className="form__link">Войти</Link></p>
    </form>
      </main>
      <InfoTooltip
        imageUrl = "/react-mesto-auth/static/media/done-picture.1b6082f8.svg"
        text = "Вы успешно зарегистрировались!"
        isOpen = {infoTooltipIsOpened}
        onClose = {closePopup}/>
      </>
  )
}

export default Register;
