import React from "react";

const Button = ({text}) => {
  return (
    <button
      type="submit"
      className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 font-medium text-md w-full sm:w-auto px-5 py-2.5 rounded-lg cursor-pointer"
    >
      {text}
    </button>
  );
};

export default Button;
