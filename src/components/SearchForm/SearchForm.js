import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__icon"></div>
        <input
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
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
        <FilterCheckbox text="Короткометражки" />
      </div>
    </section>
  );
}

export default SearchForm;
