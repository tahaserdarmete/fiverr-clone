const Input = ({
  label,
  name,
  max,
  min,
  placeholder,
  type = "text",
  disabled = false,
  required = true,
  multiple = false,
  defaultValue,
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={label}>{label}</label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 text-dark disabled:bg-gray-300 mt-2"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          min={min}
          max={max}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          multiple={multiple}
          defaultValue={defaultValue}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 text-dark disabled:bg-gray-300 mt-2"
        />
      )}
    </div>
  );
};

export default Input;
