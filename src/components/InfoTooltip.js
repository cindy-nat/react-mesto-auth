import React from "react";

function InfoTooltip ({ onClose, imageUrl, text }) {
  return (
    <div className={`popup popup_opened`}>
      <div className="popup__form">
        <div className="popup__picture-title"
             style={{backgroundImage: `url(${imageUrl})`}}></div>
        <h2 className="popup__title popup__title_position_center">{text}</h2>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;
