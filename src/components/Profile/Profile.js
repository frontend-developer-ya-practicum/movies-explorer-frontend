import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Александр!</h2>
      <form className="profile__form">
        <fieldset className="profile_fields">
          <label className="profile__field" htmlFor="username">
            <span className="profile__field-name">Имя</span>
            <input
              className="profile__input"
              name="username"
              id="username"
              type="username"
              required
            />
          </label>

          <label className="profile__field" htmlFor="email">
            <span className="profile__field-name">E-mail</span>
            <input
              className="profile__input"
              name="email"
              id="email"
              type="email"
              required
            />
          </label>
        </fieldset>

        <fieldset className="profile__buttons">
          <button
            className="profile__button profile__button_action_edit"
            type="button"
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_action_logout"
            type="button"
          >
            Выйти из аккаунта
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default Profile;
