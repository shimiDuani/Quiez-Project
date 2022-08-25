import "./dropDownComponent.scss";
const DropDown = (props) => {
  return (
    <label>
      {props.text}
      <select value={props.value} onChange={props.onChange}>
        {props.options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
};
export default DropDown;
