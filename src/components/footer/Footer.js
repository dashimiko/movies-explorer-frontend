function Footer() {
  return (
    <div className="footer section">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__line line"></div>
      <div className="footer__box">
        <p className="footer__year">© 2022</p>
        <ul className="footer__link-list">
          <li><a className="footer__link link" target="_blank" rel="noreferrer" href="https://practicum.yandex.ru/">Яндекс.Практикум</a></li>
          <li><a className="footer__link link" target="_blank" rel="noreferrer" href="https://github.com/dashimiko">Github</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
