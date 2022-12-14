import studentPicture from '../../images/student__picture.jpg';

function AboutMe() {
  return (
    <section className="about-me section">
      <h2 className="about-me__title title">Студент</h2>
      <div className="about-me__line line"></div>
      <article className="about-me__container">
        <div className='about-me__box'>
          <h3 className='about-me__heading'>Дарья</h3>
          <p className='about-me__subtitle'>Начинающий фронтенд-разработчик, 28 лет</p>
          <p className='about-me__description'>Я родилась в Хабаровске, сейчас живу в Тбилиси. Получила диплом бакалавра мультимедийной журналистики и магистра истории искусств ДВФУ. Я люблю плавание, учу английский язык, воспитываю кота и попугая. Недавно начала кодить. Хочу попасть на стажировку в сильную команду разработчиков.</p>
          <span className='about-me__github'><a className='about-me__link link' rel="noreferrer" target="_blank" href="https://github.com/dashimiko">Github</a></span>
        </div>
        <img className='about-me__picture' alt="фото студента." src={studentPicture}/>
      </article>
    </section>
  );
}

export default AboutMe;
