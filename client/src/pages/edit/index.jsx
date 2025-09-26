import React, {useContext, useEffect} from "react";
import {categories, inputs} from "../../utils/constants";
import Input from "../../component/input";
import Select from "../../component/select";
import {useCreateGig, useGetOneGig, useUpdateGig} from "../../services/gig";
import {AuthContext} from "../../context/authContext";
import {useParams} from "react-router-dom";
import Loader from "../../component/loader";

const Edit = () => {
  // mutasyon kurulumu (uzak veri tabanında değişiklik yapcak istek)
  const {token} = useContext(AuthContext);

  const {id} = useParams();

  // Editlenecek gig in verisini çek
  const {isLoading, data, error, refetch} = useGetOneGig(id);

  const {mutate, isPending} = useUpdateGig();

  const handleSubmit = (e) => {
    e.preventDefault();

    // inputlardaki bütün verileri al
    const gigData = new FormData(e.currentTarget);

    // api istek at
    mutate({form: gigData, token, id});
  };

  if (data) {
    console.log(data);
  }

  return (
    <div>
      <h1 className="font-bold text-3xl mb-5 text-gray-600">
        Hizmeti Güncelle
      </h1>

      <form action="" onSubmit={handleSubmit}>
        <div>
          {inputs.map((item, key) =>
            item.name == "coverImage" || item.name == "images" ? (
              <Input {...item} required={false} key={key} />
            ) : (
              <Input
                placeholder={data?.[item.name]}
                defaultValue={data?.[item.name]}
                {...item}
                key={key}
              />
            )
          )}

          <Select
            defaultValue={data?.category}
            label="Kategori"
            options={categories}
            name="category"
          />
        </div>

        <div className="flex md:justify-center my-5">
          <button className="bg-green-500 px-6 py-2 rounded-md text-white hover:bg-green-600 max-sm:w-full w-1/2 sm:mx-auto flex justify-center disabled:opacity-80 cursor-pointer transition-all">
            {isPending ? <Loader /> : <div>Düzenle</div>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
