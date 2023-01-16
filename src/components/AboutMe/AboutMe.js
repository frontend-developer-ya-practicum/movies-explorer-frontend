import "./AboutMe.css";

import photo from "../../images/me.jpeg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="student">
        <div className="student__info">
          <h3 className="student__name">Александр</h3>
          <p className="student__job-age">Фронтенд-разработчик, 33 года</p>
          <p className="student__bio">
            Живу и работаю в Москве, закончил факультет прикладной математики
            ИКСИ. Прохожу курс Web-разработчик в Яндекс.Практикуме для
            расширения кругозора и изучения новых технологий.
          </p>
          <a href="https://github.com/hikjik" className="student__github">
            Github
          </a>
        </div>
        <img src={photo} alt="Фото студента" className="student__photo" />
      </div>
    </section>
  );
}

export default AboutMe;
