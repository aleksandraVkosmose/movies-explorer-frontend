import { inputPT } from "../../../utils/propTypes.js";

function Input({ title, name, type, error, inputClassName = '', labelClassName = '', value, onChange }) {
  const requiredProps =
    type === "text"
      ? { minLength: 2, maxLength: 30 }
      : type === "password"
        ? { minLength: 3 }
        : null;


  return (
    <label className={`${!labelClassName && "input-label"} ${labelClassName}`}>
      <p className="input-text">{title}</p>
      <input
        value={value}
        name={name}
        type={type}
        className={`${!inputClassName && "input"} ${error && "color_error"} ${inputClassName}`}
        onChange={onChange}
        {...requiredProps}
      />
      <span className={`input-error ${error && "input-error_visible"}`}>{error}</span>
    </label>
  );
}

Input.propTypes = inputPT;

export default Input;