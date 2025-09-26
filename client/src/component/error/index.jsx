import React from "react";
import NotFound from "../notfound";

const Error = ({error, refetch}) => {
  return (
    // Eğer 404 alırsak
    error.status == 404 ? (
      <NotFound />
    ) : (
      <div className="flex flex-col items-center gap-5 justify-center mt-10 p-4 rounded-md bg-red-400 text-white ">
        <h1>Hata Oluştu</h1>
        <p>{error?.message || "..."}</p>
        <button
          onClick={refetch}
          className="bg-white text-red-400 p-2 rounded-md hover:bg-red-400 hover:text-white border-2 border-transparent hover:border-white transition-all cursor-pointer"
        >
          Tekrar Dene
        </button>
      </div>
    )
  );
};

export default Error;
