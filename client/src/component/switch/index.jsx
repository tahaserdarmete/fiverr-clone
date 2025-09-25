import React from "react";

const Switch = ({setIsSeller}) => {
  return (
    <div className="flex gap-15 items-center mb-5">
      <p>Satıcı Hesabını etkinleştir</p>

      <label className="inline-flex items-center cursor-pointer">
        <input
          onChange={(e) => setIsSeller(e.target.checked)}
          type="checkbox"
          value=""
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full   dark:bg-red-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600  dark:peer-checked:bg-green-600"></div>
      </label>
    </div>
  );
};

export default Switch;
