import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>

      <div className="about-project__notes">
        <div className="about-project__note">
          <h2 className="about-project__note-title">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="about-project__note-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>

        <div className="about-project__note">
          <h2 className="about-project__note-title">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about-project__note-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="time-spent table">
        <div className="table__cell table__cell_theme_black">
          <p className="table__text">1 неделя</p>
        </div>
        <div className="table__cell table__cell_theme_grey">
          <p className="table__text">4 недели</p>
        </div>
        <div className="table__cell table__cell_theme_transparent">
          <p className="table__text">Back-end</p>
        </div>
        <div className="table__cell table__cell_theme_transparent">
          <p className="table__text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
