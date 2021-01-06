import React from "react";
import {useHistory, withRouter} from "react-router-dom";
import * as Auth from '../utils/auth';


function Login ({handleLogin}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

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
        //setInfoTooltip(true);
        console.log(err);
      });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Вход</h2>
      <input className="form__input" placeholder="Email" type="email" onChange={handleEmailChange}/>
      <input className="form__input" placeholder="Пароль" type="password" onChange={handlePasswordChange}/>
      <button type="submit" className="form__submit-button">Войти</button>
    </form>
  );
}

export default withRouter(Login);
