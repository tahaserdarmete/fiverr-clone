import React from "react";

const Select = ({label, options, name}) => {
  return (
    <div className="mb-5 flex flex-col">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>

      <select
        name={name}
        id={name}
        className="bg-gray-50 border border-gray-500 rounded-md p-2.5 placeholder-gray-400 text-dark focus:border-blue-500"
      >
        {options.map((category, key) => (
          <option value={category.name} key={key}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
