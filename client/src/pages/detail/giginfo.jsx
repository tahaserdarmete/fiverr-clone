import React, {useContext} from "react";
import Rating from "../../component/card/rating";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import {notFound} from "../../utils/constants";
import CustomImage from "../../component/image";
import {Link, useParams} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import {useDeleteGig} from "../../services/gig.js";
import {AuthContext} from "../../context/authContext";

const GigInfo = ({gig}) => {
  const {token} = useContext(AuthContext);

  const {id} = useParams();

  // Hizmet silme API isteği
  const {mutate, isPending} = useDeleteGig();

  return (
    <div className="flex flex-1 flex-col gap-5">
      <h1 className="text-3xl font-semibold border-gray-200">{gig.title}</h1>

      {/* Gig hakkında bilgiler */}
      <div className="w-full">
        <img
          src={gig.coverImage}
          className="object-contain h-full w-full m-auto max-w-[600px] rounded-md shadow"
        />
      </div>

      <div className="flex justify-between items-center">
        <Rating rating={gig.starCount} reviews={gig.reviewCount} />

        <div className="flex gap-3 text-white">
          <Link
            to={`/edit-gig/${gig._id}`}
            className="inline-flex items-center gap-1 p-1 px-2 bg-amber-300 rounded-md cursor-pointer"
          >
            <FaEdit />
            Düzenle
          </Link>

          <button
            className="inline-flex items-center gap-1 p-1 px-2 bg-red-500 rounded-md cursor-pointer"
            onClick={() => mutate({id, token})}
          >
            <FaTrash />
            Sil
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <img src={gig.user.photo} className="size-8 rounded-full" alt="" />
        <h4 className="font-semibold">{gig.user.username}</h4>tarafından ilan
        verildi.
      </div>
      {/* Resim galerisi */}
      <div className="my-16">
        {gig.images.length > 0 && (
          <Splide aria-label="My Favorite Images">
            {
              //
              gig.images.map((item, key) => (
                <SplideSlide>
                  <CustomImage
                    src={item}
                    alt={key}
                    key={key}
                    className="object-contain w-full h-full max-h-[450px]"
                  />
                </SplideSlide>
              ))
            }
          </Splide>
        )}
      </div>
      {/* Açıklama Alanı */}
      <div>
        <h1 className="font-bold text-xl mb-2 mt-5">
          Bu hizmet hakkında bilgiler
        </h1>
        <p className="text-gray-600 ">{gig.description}</p>
      </div>
    </div>
  );
};

export default GigInfo;
