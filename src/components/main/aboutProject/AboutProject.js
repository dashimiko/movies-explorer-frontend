function AboutProject() {
  return (
    <section className="about-project section">
      <h2 className="about-project__title title">О проекте</h2>
      <div className="about-project__line line"></div>
      <ul className="about-project__list">
        <li className="about-project__list-group">
          <h3 className="about-project__heading">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__list-group">
          <h3 className="about-project__heading">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="about-project__scheme">
        <div className="about-project__backend">
          <span className="about-project__backend-week">1 неделя</span>
          <span className="about-project__scheme-heading">Back-end</span>
        </div>
        <div className="about-project__frontend">
          <span className="about-project__frontend-week">4 недели</span>
          <span className="about-project__scheme-heading">Front-end</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
