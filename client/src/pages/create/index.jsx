import React, {useContext} from "react";
import {categories, inputs} from "../../utils/constants";
import Input from "../../component/input";
import Select from "../../component/select";
import {useCreateGig} from "../../services/gig";
import {AuthContext} from "../../context/authContext";
import Loader from "../../component/loader";

const Create = () => {
  // mutasyon kurulumu (uzak veri tabanında değişiklik yapcak istek)
  const {token} = useContext(AuthContext);

  const {mutate, isPending} = useCreateGig();

  const handleSubmit = (e) => {
    e.preventDefault();

    // inputlardaki bütün verileri al
    const gigData = new FormData(e.currentTarget);

    // console.log("form verisi", gigData instanceof FormData);
    console.log("tokenimiz:", token);

    // api istek at
    mutate({form: gigData, token});
  };
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5 text-gray-600">
        Yeni Hizmet Oluştur
      </h1>

      <form action="" onSubmit={handleSubmit}>
        <div>
          {inputs.map((item, key) => (
            <Input {...item} key={key} />
          ))}

          <Select label="Kategori" options={categories} name="category" />
        </div>

        <div className="flex md:justify-center my-5">
          <button className="bg-green-500 px-6 py-2 rounded-md text-white hover:bg-green-600 max-sm:w-full w-1/2 sm:mx-auto flex justify-center disabled:opacity-80 cursor-pointer transition-all">
            {isPending ? <Loader /> : <div>Oluştur</div>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
