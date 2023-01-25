import "./AuthFormInput.css";

function AuthFormInput({ value, onChange, title, type, id, name }) {
  return (
    <label className="form__field" htmlFor={type}>
      <span className="form__field-name">{title}</span>
      <input
        value={value}
        className="form__input"
        onChange={onChange}
        name={name}
        id={id}
        type={type}
        required
      />
      <span className="form__input-error">Что-то пошло не так...</span>
    </label>
  );
}

export default AuthFormInput;
