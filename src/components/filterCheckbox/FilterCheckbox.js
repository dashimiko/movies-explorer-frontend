function FilterCheckbox() {
  return (
    <label className="checkbox">
      <input className="checkbox__invisible-input" type="checkbox" name="checkbox"/>
      <span className="checkbox__visible-input button"></span>
      <p className="checkbox__title">Короткометражки</p>
    </label>
  );
}

export default FilterCheckbox;
