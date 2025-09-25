import React from "react";
import CustomImage from "../../component/image";
import Rating from "../../component/card/rating";
import {PiStarFill, PiStar} from "react-icons/pi";
import {FaCamera} from "react-icons/fa";

const UserInfo = ({user}) => {
  return (
    <div className="mt-20 border-t border-neutral-200">
      <h1 className="font-bold text-xl mt-10 mb-3">
        {user.username}'i tanıyalım
      </h1>

      <div className="flex flex-col items-center gap-3">
        <CustomImage
          src={user.photo}
          className="size-28 rounded-full object-cover"
        />

        <h4 className="font-semibold">{user.username}</h4>

        <p className="text-gray-600 font-[300] text-center">
          {user.description}
        </p>

        <div className="flex gap-5">
          <Rating rating={4.1} reviews={1026} />

          <div className="flex items-center bg-orange-800/40 py-1 px-2 rounded-md text-yellow-200">
            <PiStarFill />
            <PiStarFill />
            <PiStarFill />
            <PiStarFill />
            <PiStar />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-5 font-semibold">
        <button className="py-2 px-5 border rounded-md hover:bg-zinc-200 transition cursor-pointer">
          İletişime Geç
        </button>

        <button className="py-2 px-5 border rounded-md bg-green-800 hover:bg-green-600 text-white border-white outline-1 outline-black transition cursor-pointer flex items-center gap-2">
          <FaCamera />
          Toplantı Ayarla
        </button>
      </div>

      <div className="border border-zinc-300 my-10 p-5 grid md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Nereden</span>
          <span className="text-zinc-700 font-semibold">{user.country}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Üyelik Tarihi</span>
          <span className="text-zinc-700 font-semibold">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Telefon</span>
          <span className="text-zinc-700 font-semibold">{user.phone}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Mail</span>
          <span className="text-zinc-700 font-semibold">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
