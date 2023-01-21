import "./FilterCheckbox.css";

function FilterCheckbox({ text }) {
  return (
    <label className="switch">
      <input className="switch__input" type="checkbox" />
      <span className="switch__pseudo">
        <span className="switch__handle" />
      </span>
      <span className="switch__label">{text}</span>
    </label>
  );
}

export default FilterCheckbox;
