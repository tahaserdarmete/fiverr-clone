import React from "react";
import {categories} from "../../utils/constants";
import {Link} from "react-router-dom";

const Category = () => {
  return (
    <div className="my-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-5">
      {categories.map((i, key) => (
        <Link
          to={`/search?category=${i.name}`}
          className="border shadow p-4 rounded-md cursor-pointer hover:shadow-xl border-zinc-200 hover:bg-gray-100 transition"
        >
          <div className="flex flex-col gap-3 items-center text-center">
            <span>{i.icon}</span>
            <span>{i.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
