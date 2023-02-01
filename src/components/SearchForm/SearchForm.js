import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function SearchForm({
  query,
  onSearchMovies,
  onChangeCheckbox,
  checkboxChecked,
}) {
  const { values, handleChange, resetForm, errors } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearchMovies(values.query);
  }

  useEffect(() => {
    if (query) {
      resetForm({ query }, {}, true);
    }
  }, [query, resetForm]);

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__icon"></div>
        <input
          value={values.query || ""}
          error={errors.query}
          onChange={handleChange}
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          name="query"
          required
        ></input>
        <button
          className="search__submit-btn"
          type="submit"
          aria-label="Искать фильм"
        ></button>
        <div className="search__vertical-line"></div>
      </form>

      <div className="search__checkbox">
        <FilterCheckbox
          text="Короткометражки"
          onChange={onChangeCheckbox}
          checked={checkboxChecked}
        />
      </div>
    </section>
  );
}

export default SearchForm;
