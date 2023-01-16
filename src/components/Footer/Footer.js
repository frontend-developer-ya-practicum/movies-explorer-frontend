import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2022 Александр Морев</p>

        <nav className="footer__nav">
          <a href="https://practicum.yandex.ru" className="footer__link">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/hikjik" className="footer__link">
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
