import React from "react";
import {Link} from "react-router-dom";
import Rating from "./rating";
import {notFound} from "../../utils/constants";

const Card = ({item}) => {
  return (
    <div className="flex flex-1">
      {/* expand mantığını ekle */}
      {/* <button>Expand</button> */}

      <Link
        to={`/detail/${item._id}`}
        className=" rounded-md cursor-pointer flex flex-col gap-2 shadow-lg border border-gray-200"
      >
        <img
          src={item.coverImage}
          alt=""
          className="w-[400px] h-[200px] object-cover border-b border-gray-200 shadow-sm shadow-gray-100 rounded-t-md"
          onError={(e) => (e.currentTarget.src = notFound)}
        />

        <div className="p-4">
          <h2 className="text-2xl font-semibold line-clamp-2">{item.title}</h2>

          <div className="flex gap-2 items-center mt-4">
            <img src={item.user.photo} alt="" className="size-8 rounded-full" />

            <p>
              <span className="font-semibold">{item.user.username}</span>
              <span className="text-gray-500"> tarafından oluşturuldu.</span>
            </p>
          </div>

          <Rating
            rating={item.starCount}
            reviews={item.reviewCount}
            designs=""
          />

          <p className="mt-4">
            <span className="font-semibold text-xl">
              ${item.packagePrice.toLocaleString()}
            </span>
            <span className="text-gray-500">'den başlayan fiyatlarla</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
