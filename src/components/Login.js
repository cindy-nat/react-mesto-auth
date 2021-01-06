import React from "react";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";
import {useHistory, withRouter} from "react-router-dom";
import * as Auth from '../utils/auth';
import pictureError from '../images/error-picture.svg'


function Login ({handleLogin}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [infoTooltipIsOpened, setInfoTooltip] = React.useState(false);

  const history = useHistory();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const closePopup = () => setInfoTooltip(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.authorize(email, password)
      .then(data => {
        if(data.token) {
          localStorage.setItem('jwt', data.token);
          handleLogin();
          history.push("/");
        }
      })
      .catch(err=>{
        setInfoTooltip(true);
        console.log(err);
      });
  }

  return (
    <>
      <Header
        text="Регистрация"
        textColor="#FFFFFF"
        link = "sign-up"/>
      <main className="content">
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Вход</h2>
      <input className="form__input" placeholder="Email" type="email" onChange={handleEmailChange}/>
      <input className="form__input" placeholder="Пароль" type="password" onChange={handlePasswordChange}/>
      <button type="submit" className="form__submit-button">Войти</button>
    </form>
      </main>
      <InfoTooltip
        picture = {pictureError}
        text="Что-то пошло не так! Попробуйте ещё раз."
        isOpen = {infoTooltipIsOpened}
        onClose = {closePopup}/>
      </>
  );
}

export default withRouter(Login);
