function NotFound({historyReturn}) {

  return (
    <section className="notfound section">
        <h2 className="notfound__title">404</h2>
        <p className="notfound__subtitle">Страница не найдена</p>
        <button onClick={historyReturn} className='notfound__link link'>Назад</button>
    </section>
  );
}

export default NotFound;
