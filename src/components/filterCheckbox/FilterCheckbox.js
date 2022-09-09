function FilterCheckbox() {

  return (
    <label className="checkbox">
      <input className="checkbox__invisible-input" type="checkbox" name="checkbox"/>
      <span className="button checkbox__visible-input"></span>
      <p className="checkbox__title">Короткометражки</p>
    </label>
  );
}

export default FilterCheckbox;
