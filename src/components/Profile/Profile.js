import "./Profile.css";

import { useAuth } from "../../hooks/useAuth";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useNavigate } from "react-router-dom";
import { useTooltip } from "../../hooks/useTooltip";

function Profile() {
  const navigation = useNavigate();

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const { user, updateMe } = useCurrentUser();
  const { signOut } = useAuth();

  const tooltip = useTooltip();

  useEffect(() => {
    if (user) {
      resetForm(user, {}, true);
    }
  }, [user, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    updateMe({
      name: values.name,
      email: values.email,
    }).catch((err) => {
      tooltip.open(err, false);
    });
    tooltip.open("Данные пользователя обновлены успешно", true);
  }

  function handleClose() {
    signOut().then(navigation("/"));
  }

  const isEdited = user.name !== values.name || user.email !== values.email;

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {user.name || ""}!</h2>
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
            onClick={handleClose}
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
