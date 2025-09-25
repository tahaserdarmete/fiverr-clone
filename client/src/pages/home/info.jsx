import React from "react";
import {items} from "../../utils/constants";
import {BsFillPatchCheckFill} from "react-icons/bs";

const Info = () => {
  return (
    <div className="my-10 bg-green-100/70 rounded-md p-4 sm:p-6">
      <h1 className="text-3xl">
        <span className="font-extrabold">fiverr.</span>
        <span>pro</span>
      </h1>

      <p className="text-3xl font-light my-6 sm:my-8">
        İşletmeler için <span className="text-green-400">premium</span>{" "}
        freelance çözümü
      </p>

      <div className="grid md:grid-cols-2 gap-4 gap-x-8">
        {items.map(({title, text}, key) => {
          return (
            <div key={key}>
              <h5 className="font-semibold flex items-center gap-3">
                <BsFillPatchCheckFill />
                {title}
              </h5>
              <p className="pt-1 pb-5">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
