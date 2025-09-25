import React from "react";
import {RiLoginBoxLine} from "react-icons/ri";
import {Link} from "react-router-dom";

const Links = () => {
  return (
    <div className="flex items-center justify-center text-center">
      <Link
        to={"/login"}
        className="flex bg-green-400 text-white p-2 rounded-md"
      >
        <RiLoginBoxLine className="text-2xl" />
        Giriş
      </Link>
    </div>
  );
};

export default Links;
