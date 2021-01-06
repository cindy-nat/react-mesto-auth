import logo from '../images/logo.svg';
import {Link} from "react-router-dom";

function Header({email, text, textColor, link, handleSignOut}) {
    return (
        <header className="header page__header">
            <img src={logo} alt="Логотип" className="header__logo"/>
          <div className="header__small-screen-lines"> </div>
            <div className="header__container">
              <p className="header__email">{email}</p>
              <Link className="header__text"
                    style={{color:`${textColor}`}}
                    to={`${link}`}
                    onClick = {handleSignOut}
              >{text}</Link>
            </div>
        </header>)
}
export default Header;
