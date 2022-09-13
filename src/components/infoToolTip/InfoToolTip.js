import React from "react";
import completed from "../../images/completed.png"

export default function InfoTooltip({isOpen, onClose}) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button onClick={onClose} className="popup__close" type="button"></button>
        <div className="popup__box">
          <img className="popup__pic" src={completed} alt='здесь будет текст'></img>
          <p className="popup__title">здесь будет текст</p>
        </div>
      </div>
    </section>
  );
}
