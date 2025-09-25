import React from "react";
import {FaHome} from "react-icons/fa";
import {Link} from "react-router-dom";

const Breadcrumb = ({category}) => {
  return (
    <div className="my-5 border-b pb-3 border-neutral-200">
      <p className="flex items-center gap-3 text-gray-500">
        <Link to="/">
          <FaHome />
        </Link>

        <span> / </span>

        <Link to={`/search?category=${category}`} className="hover:underline">
          {category}
        </Link>
      </p>
    </div>
  );
};

export default Breadcrumb;
