import "./Profile.css";

import { useContext, useEffect, useState } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onLogout, onUpdateUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, email });
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name || ""}!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <fieldset className="profile__fields">
          <label className="profile__field" htmlFor="username">
            <span className="profile__field-name">Имя</span>
            <input
              value={name || ""}
              onChange={handleChangeName}
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
              value={email || ""}
              onChange={handleChangeEmail}
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
            type="submit"
            aria-label="Редактировать профиль"
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_action_logout"
            onClick={onLogout}
            type="button"
            aria-label="Выйти из аккаунта"
          >
            Выйти из аккаунта
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default Profile;
