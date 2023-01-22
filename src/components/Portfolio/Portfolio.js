import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__links">
        <a
          href="https://frontend-developer-ya-practicum.github.io/how-to-learn/"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__text">Статичный сайт</p>
          <p className="portfolio__arrow">↗</p>
        </a>

        <a
          href="https://frontend-developer-ya-practicum.github.io/russian-travel/"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__text">Адаптивный сайт</p>
          <p className="portfolio__arrow">↗</p>
        </a>

        <a
          href="https://frontend-developer-ya-practicum.github.io/mesto/"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__text">Одностраничное приложение</p>
          <p className="portfolio__arrow">↗</p>
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;
