import "./Profile.css";

import { useContext, useEffect } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile({ onLogout, onUpdateUser }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      email: values.email,
    });
  }

  const isEdited =
    currentUser.name !== values.name || currentUser.email !== values.email;

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name || ""}!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <fieldset className="profile__fields">
          <label className="profile__field" htmlFor="username">
            <span className="profile__field-name">Имя</span>
            <input
              value={values.name || ""}
              error={errors.name}
              onChange={handleChange}
              className="profile__input"
              name="name"
              id="name"
              type="text"
              pattern="^[A-Za-zА-Яа-я-\s]+$"
              required
            />
            <span className="profile__input-error">{errors.name}</span>
          </label>

          <label className="profile__field" htmlFor="email">
            <span className="profile__field-name">E-mail</span>
            <input
              value={values.email || ""}
              error={errors.email}
              onChange={handleChange}
              className="profile__input"
              name="email"
              id="email"
              type="email"
              required
            />
            <span className="profile__input-error">{errors.email}</span>
          </label>
        </fieldset>

        <fieldset className="profile__buttons">
          <button
            className={`profile__button profile__button_action_edit ${
              !isValid || !isEdited ? "profile__button_disabled" : ""
            }`}
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
