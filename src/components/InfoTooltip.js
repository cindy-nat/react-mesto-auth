import React from "react";


function InfoTooltip ({ onClose, picture, text, isOpen }) {

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__form">
        <img className="popup__picture-title"
             src={picture} alt={text}></img>
        <h2 className="popup__title popup__title_position_center">{text}</h2>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;
