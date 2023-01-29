import "./AuthFormInput.css";

function AuthFormInput({
  value,
  onChange,
  title,
  type,
  id,
  name,
  error,
  pattern,
  minLength,
  maxLength,
}) {
  return (
    <label className="form__field" htmlFor={type}>
      <span className="form__field-name">{title}</span>
      <input
        value={value || ""}
        className={`form__input ${
          error !== "" ? "form__input_type_error" : ""
        }`}
        onChange={onChange}
        name={name}
        id={id}
        type={type}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <span className="form__input-error">{error || ""}</span>
    </label>
  );
}

export default AuthFormInput;
