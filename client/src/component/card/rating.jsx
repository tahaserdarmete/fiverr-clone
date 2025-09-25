import React from "react";
import {FaStar} from "react-icons/fa";

const Rating = ({rating, reviews, designs}) => {
  return (
    <div className={` flex gap-1 items-center ${designs} mt-4`}>
      <span className="text-orange-400 text-xl">
        <FaStar />
      </span>

      <span className="font-semibold">{rating}</span>
      <span className="text-gray-500 font-normal underline">{reviews}</span>
    </div>
  );
};

export default Rating;
