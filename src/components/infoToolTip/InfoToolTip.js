import React from "react";
import completed from "../../images/completed.png";
import failed from '../../images/failed.png';

export default function InfoTooltip({isOpen, onClose, isEntrance, text}) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button onClick={onClose} className="popup__close" type="button"></button>
        <div className="popup__box">
          <img className="popup__pic" src={isEntrance ? completed : failed} alt={text}></img>
          <p className="popup__title">{text}</p>
        </div>
      </div>
    </section>
  );
}
