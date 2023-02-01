import "./FilterCheckbox.css";

function FilterCheckbox({ text, onChange, checked }) {
  return (
    <label className="switch">
      <input
        className="switch__input"
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <span className="switch__pseudo">
        <span className="switch__handle" />
      </span>
      <span className="switch__label">{text}</span>
    </label>
  );
}

export default FilterCheckbox;
