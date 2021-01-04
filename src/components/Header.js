import logo from '../images/logo.svg';

function Header({email, text, textColor}) {
    return (
        <header className="header page__header">
            <img src={logo} alt="Логотип" className="header__logo"/>
            <div className="header__container">
              <p className="header__email">{email}</p>
              <p className="header__text" style={{color:`${textColor}`}}>{text}</p>
            </div>
        </header>)
}
export default Header;
