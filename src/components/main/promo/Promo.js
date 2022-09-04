import promoPicture from '../../../images/promo_picture.png';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__section section">
        <div className="promo__container">
          <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button className="promo__button" type="button">Узнать больше</button>
        </div>
        <img className='promo__picture' alt="иллюстрация с планетой, состоящей из букв" src={promoPicture}/>
      </div>
    </section>
  );
}

export default Promo;
