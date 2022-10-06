
function Portfolio() {
  return (
    <section className="portfolio section">
      <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a className="portfolio__link link" target="_blank" rel="noreferrer" href="https://github.com/dashimiko/green_lighthouse">
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link link" target="_blank" rel="noreferrer" href="https://github.com/dashimiko/russian-travel">
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link link" target="_blank" rel="noreferrer" href="https://github.com/dashimiko/react-mesto-api-full">
              Одностраничное приложение
            </a>
          </li>
        </ul>
    </section>
  );
}

export default Portfolio;
